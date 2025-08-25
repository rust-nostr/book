import React from 'react';
import CodeBlock from '@theme/CodeBlock';

interface AnchoredCodeProps {
    children: string;
    anchor: string;
    language: string;
    title?: string;
    showLineNumbers?: boolean;
}

export default function AnchoredCode({ children, anchor, language, title, showLineNumbers = true }: AnchoredCodeProps) {
    const lines: string[] = children.split('\n');

    // Support both '//' and '#' for the anchor comments
    const commentPrefixes: string[] = ['//', '#'];

    let startMarker: string = "";
    let endMarker: string = "";
    let startIndex: number = -1;
    let endIndex: number = -1;

    // Find the start marker
    for (const prefix of commentPrefixes) {
        startMarker = `${prefix} ANCHOR: ${anchor}`;
        endMarker = `${prefix} ANCHOR_END: ${anchor}`;

        startIndex = lines.findIndex(line => line.includes(startMarker));
        endIndex = lines.findIndex(line => line.includes(endMarker));

        if (startIndex !== -1 && endIndex !== -1) {
            break;
        }
    }

    if (startIndex === -1 || endIndex === -1) {
        return <div>Anchor "{anchor}" not found</div>;
    }

    // Extract the rows between the anchors
    let codeLines = lines.slice(startIndex + 1, endIndex);

    // Remove all the rows that contain ANCHOR or ANCHOR_END
    codeLines = codeLines.filter(line => {
        const trimmed: string = line.trim();
        return !trimmed.startsWith('// ANCHOR:') &&
            !trimmed.startsWith('// ANCHOR_END:') &&
            !trimmed.startsWith('# ANCHOR:') &&
            !trimmed.startsWith('# ANCHOR_END:');
    });

    // Remove the empty spaces from the start and end of the lines
    while (codeLines.length > 0 && codeLines[0].trim() === '') {
        codeLines.shift();
    }
    while (codeLines.length > 0 && codeLines[codeLines.length - 1].trim() === '') {
        codeLines.pop();
    }

    // Calculate the minimum indentation (excluding the empty lines)
    let minIndent: number = Infinity;
    for (const line of codeLines) {
        if (line.trim() !== '') {
            const indent = line.length - line.trimStart().length;
            minIndent = Math.min(minIndent, indent);
        }
    }

    // If there are no lines with content, set minIndent to 0.
    if (minIndent === Infinity) {
        minIndent = 0;
    }

    // Remove common indentation from all lines
    codeLines = codeLines.map(line => {
        if (line.trim() === '') {
            return ''; // Keep blank lines as blank lines
        }
        return line.slice(minIndent);
    });


    const code: string = codeLines.join('\n');

    return (
        <CodeBlock language={language} title={title} showLineNumbers={showLineNumbers}>
            {code}
        </CodeBlock>
    );
};
