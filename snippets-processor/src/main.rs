use std::io;

use clap::{Arg, ArgMatches, Command};
use mdbook_preprocessor::book::{Book, BookItem};
use mdbook_preprocessor::errors::{Error, Result};
use mdbook_preprocessor::{parse_input, Preprocessor, PreprocessorContext, MDBOOK_VERSION};

fn main() -> Result<()> {
    let matches = command().get_matches();
    let preprocessor = SnippetsProcessor;

    if let Some(arguments) = matches.subcommand_matches("supports") {
        handle_supports(&preprocessor, arguments)
    } else {
        handle_preprocessing(&preprocessor)
    }
}

fn command() -> Command {
    Command::new("mdbook-snippets")
        .version(env!("CARGO_PKG_VERSION"))
        .about("Remove shared leading whitespace from fenced code blocks")
        .subcommand(
            Command::new("supports")
                .about("Check whether a renderer is supported")
                .arg(Arg::new("renderer").required(true)),
        )
}

fn handle_supports(preprocessor: &dyn Preprocessor, arguments: &ArgMatches) -> Result<()> {
    let renderer = arguments
        .get_one::<String>("renderer")
        .ok_or_else(|| Error::msg("missing renderer argument"))?;

    if preprocessor.supports_renderer(renderer)? {
        Ok(())
    } else {
        Err(Error::msg(format!(
            "the snippets preprocessor does not support the '{renderer}' renderer"
        )))
    }
}

fn handle_preprocessing(preprocessor: &dyn Preprocessor) -> Result<()> {
    let (context, book) = parse_input(io::stdin())?;
    warn_on_version_mismatch(&context.mdbook_version);

    let processed_book = preprocessor.run(&context, book)?;
    serde_json::to_writer(io::stdout(), &processed_book)?;
    Ok(())
}

fn warn_on_version_mismatch(version: &str) {
    if version != MDBOOK_VERSION {
        eprintln!(
            "mdbook-snippets was built for mdBook v{}, but mdBook v{version} invoked it",
            MDBOOK_VERSION
        );
    }
}

struct SnippetsProcessor;

impl Preprocessor for SnippetsProcessor {
    fn name(&self) -> &str {
        "snippets"
    }

    fn run(&self, _context: &PreprocessorContext, mut book: Book) -> Result<Book> {
        book.for_each_mut(|item| {
            if let BookItem::Chapter(chapter) = item {
                chapter.content = dedent_code_blocks(&chapter.content);
            }
        });
        Ok(book)
    }
}

fn dedent_code_blocks(content: &str) -> String {
    let mut output = Vec::new();
    let mut block = Vec::new();
    let mut fence = None;

    for line in content.lines() {
        if let Some(marker) = fence_marker(line) {
            if fence == Some(marker) {
                append_dedented(&mut output, &mut block);
                fence = None;
                output.push(line.to_owned());
                continue;
            }

            if fence.is_none() {
                fence = Some(marker);
                output.push(line.to_owned());
                continue;
            }
        }

        if fence.is_some() {
            block.push(line.replace('\t', "    "));
        } else {
            output.push(line.to_owned());
        }
    }

    append_dedented(&mut output, &mut block);

    let mut result = output.join("\n");
    if content.ends_with('\n') {
        result.push('\n');
    }
    result
}

fn fence_marker(line: &str) -> Option<char> {
    let line = line.trim_start();
    if line.starts_with("```") {
        Some('`')
    } else if line.starts_with("~~~") {
        Some('~')
    } else {
        None
    }
}

fn append_dedented(output: &mut Vec<String>, block: &mut Vec<String>) {
    let indentation = block
        .iter()
        .filter(|line| !line.trim().is_empty())
        .map(|line| line.len() - line.trim_start_matches(' ').len())
        .min()
        .map_or(0, |indentation| indentation);

    output.extend(block.drain(..).map(|line| {
        let indentation = indentation.min(line.len());
        line[indentation..].to_owned()
    }));
}

#[cfg(test)]
mod tests {
    use super::dedent_code_blocks;

    #[test]
    fn removes_shared_indentation_inside_fences_only() {
        let markdown = "  prose\n```rust\n    fn main() {\n        println!(\"hi\");\n    }\n```\n";

        assert_eq!(
            dedent_code_blocks(markdown),
            "  prose\n```rust\nfn main() {\n    println!(\"hi\");\n}\n```\n"
        );
    }

    #[test]
    fn preserves_relative_indentation_and_blank_lines() {
        let markdown = "~~~python\n\tasync def main():\n\n\t\tawait run()\n~~~";

        assert_eq!(
            dedent_code_blocks(markdown),
            "~~~python\nasync def main():\n\n    await run()\n~~~"
        );
    }

    #[test]
    fn keeps_unclosed_blocks_in_the_output() {
        let markdown = "```text\n    still visible";

        assert_eq!(dedent_code_blocks(markdown), "```text\nstill visible");
    }
}
