import React from "react";

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'

type TabItemElement = React.ReactElement<React.ComponentProps<typeof TabItem>>;

interface LanguageTabsProps {
    children: TabItemElement | TabItemElement[];
}

const languageOptions = [
    { label: 'Rust', value: 'rust' },
    { label: 'Python', value: 'python' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'Swift', value: 'swift' },
    { label: 'C#', value: 'csharp' },
    { label: 'JavaScript', value: 'js' },
];

export default function LanguageTabs({ children }: LanguageTabsProps) {
    return (
        <Tabs
            defaultValue="rust"
            values={languageOptions}
            groupId="plang"
            queryString="plang"
        >
            {children}
        </Tabs>
    );
}
