import React$1, { ComponentProps, ReactNode, ForwardRefExoticComponent, ComponentPropsWithRef, ReactElement } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { SidebarItem, NormalizedSidebarGroup, SidebarDivider, NormalizedLocales, LocalSearchOptions, RemoteSearchOptions, Header, FrontMatterMeta, SocialLink } from '@rspress/shared';

interface NavProps {
    beforeNav?: React.ReactNode;
    beforeNavTitle?: React.ReactNode;
    navTitle?: React.ReactNode;
    afterNavTitle?: React.ReactNode;
    afterNavMenu?: React.ReactNode;
}
declare function Nav(props: NavProps): react_jsx_runtime.JSX.Element;

interface UISwitchResult {
    showNavbar: boolean;
    showSidebar: boolean;
    showAside: boolean;
    showDocFooter: boolean;
}

interface DocLayoutProps {
    beforeSidebar?: React.ReactNode;
    afterSidebar?: React.ReactNode;
    beforeDocFooter?: React.ReactNode;
    afterDocFooter?: React.ReactNode;
    beforeDoc?: React.ReactNode;
    afterDoc?: React.ReactNode;
    beforeDocContent?: React.ReactNode;
    afterDocContent?: React.ReactNode;
    beforeOutline?: React.ReactNode;
    afterOutline?: React.ReactNode;
    uiSwitch?: UISwitchResult;
    navTitle?: React.ReactNode;
    components?: Record<string, React.FC>;
}
declare function DocLayout(props: DocLayoutProps): react_jsx_runtime.JSX.Element;

interface HomeLayoutProps {
    beforeHero?: React.ReactNode;
    afterHero?: React.ReactNode;
    beforeFeatures?: React.ReactNode;
    afterFeatures?: React.ReactNode;
}
declare function HomeLayout(props: HomeLayoutProps): react_jsx_runtime.JSX.Element;

type LayoutProps = {
    top?: React$1.ReactNode;
    bottom?: React$1.ReactNode;
    /**
     * Control whether or not to display the navbar, sidebar, outline and footer
     */
    uiSwitch?: Partial<UISwitchResult>;
} & Omit<DocLayoutProps, 'uiSwitch'> & HomeLayoutProps & NavProps;
declare const Layout: React$1.FC<LayoutProps>;

declare function NotFoundLayout(): react_jsx_runtime.JSX.Element;

declare function usePrevNextPage(): {
    prevPage: SidebarItem;
    nextPage: SidebarItem;
};

declare function useEditLink(): {
    text: string;
    link: string;
} | null;

interface SidebarData$1 {
    group: string;
    items: (NormalizedSidebarGroup | SidebarItem | SidebarDivider)[];
}
declare function useSidebarData(): SidebarData$1;

declare function useEnableNav(): readonly [boolean, React$1.Dispatch<React$1.SetStateAction<boolean>>];
declare function useHiddenNav(): boolean;

declare function useLocaleSiteData(): NormalizedLocales;

declare function scrollToTarget(target: HTMLElement, isSmooth: boolean, fallbackHeight?: number): void;
declare function bindingAsideScroll(): (() => void) | undefined;
declare function setup(): void;

declare function usePathUtils(): {
    normalizeLinkHref: (rawHref: string) => string;
};

declare function useFullTextSearch(): {
    initialized: boolean;
    search: (keyword: string, limit?: number) => Promise<MatchResult>;
};

/**
 * Redirect to current locale for first visit
 */
declare function useRedirect4FirstVisit(): void;

declare global {
    interface Window {
        MODERN_THEME?: string;
        RSPRESS_THEME?: string;
    }
}
type ThemeValue = 'light' | 'dark';
type ThemeConfigValue = ThemeValue | 'auto';
/**
 * State provider for theme context.
 */
declare const useThemeState: () => readonly [ThemeValue, (value: ThemeValue, storeValue?: ThemeConfigValue) => void];

declare function isActive(currentPath: string, targetLink?: string, strict?: boolean): boolean;
declare function isMobileDevice(): boolean;
declare function renderHtmlOrText(str?: string | number | null): React$1.ReactNode;
/**
 * In this method, we will render the markdown text to inline html and support basic markdown syntax, including the following:
 * - bold
 * - emphasis
 * - inline code
 * @param text The markdown text to render.
 */
declare function renderInlineMarkdown(text: string): React$1.ReactNode;
declare function parseInlineMarkdownText(mdx: string): string;

interface CodeProps {
    children: string;
    className?: string;
    codeHighlighter?: 'prism' | 'shiki';
    meta?: string;
}
declare function Code(props: CodeProps): react_jsx_runtime.JSX.Element;

declare function Pre({ children, }: {
    children: React.ReactElement[] | React.ReactElement;
}): react_jsx_runtime.JSX.Element;

declare function getCustomMDXComponent(): {
    h1: (props: React$1.ComponentProps<"h1">) => react_jsx_runtime.JSX.Element;
    h2: (props: React$1.ComponentProps<"h2">) => react_jsx_runtime.JSX.Element;
    h3: (props: React$1.ComponentProps<"h3">) => react_jsx_runtime.JSX.Element;
    h4: (props: React$1.ComponentProps<"h4">) => react_jsx_runtime.JSX.Element;
    h5: (props: React$1.ComponentProps<"h5">) => react_jsx_runtime.JSX.Element;
    h6: (props: React$1.ComponentProps<"h6">) => react_jsx_runtime.JSX.Element;
    ul: (props: React$1.ComponentProps<"ul">) => react_jsx_runtime.JSX.Element;
    ol: (props: React$1.ComponentProps<"ol">) => react_jsx_runtime.JSX.Element;
    li: (props: React$1.ComponentProps<"li">) => react_jsx_runtime.JSX.Element;
    table: (props: React$1.ComponentProps<"table">) => react_jsx_runtime.JSX.Element;
    td: (props: React$1.ComponentProps<"td">) => react_jsx_runtime.JSX.Element;
    th: (props: React$1.ComponentProps<"th">) => react_jsx_runtime.JSX.Element;
    tr: (props: React$1.ComponentProps<"tr">) => react_jsx_runtime.JSX.Element;
    hr: (props: React$1.ComponentProps<"hr">) => react_jsx_runtime.JSX.Element;
    p: (props: React$1.ComponentProps<"p">) => react_jsx_runtime.JSX.Element;
    blockquote: (props: React$1.ComponentProps<"blockquote">) => react_jsx_runtime.JSX.Element;
    strong: (props: React$1.ComponentProps<"strong">) => react_jsx_runtime.JSX.Element;
    a: (props: React$1.ComponentProps<"a">) => react_jsx_runtime.JSX.Element;
    code: typeof Code;
    pre: typeof Pre;
    img: (props: React$1.ComponentProps<"img">) => react_jsx_runtime.JSX.Element;
};

declare const enum RenderType {
    Default = "default",
    Custom = "custom"
}
interface HighlightInfo {
    start: number;
    length: number;
}
interface CommonMatchResult {
    title: string;
    header: string;
    link: string;
    query: string;
    highlightInfoList: HighlightInfo[];
    group: string;
}
interface TitleMatch extends CommonMatchResult {
    type: 'title';
}
interface HeaderMatch extends CommonMatchResult {
    type: 'header';
}
interface ContentMatch extends CommonMatchResult {
    type: 'content';
    statement: string;
}
type DefaultMatchResultItem = TitleMatch | HeaderMatch | ContentMatch;
type DefaultMatchResult = {
    group: string;
    renderType: RenderType;
    result: DefaultMatchResultItem[];
};
type UserMatchResultItem<T = unknown> = {
    group: string;
    result: T;
};
type CustomMatchResult = UserMatchResultItem & {
    renderType: RenderType.Custom;
};
type MatchResult = (DefaultMatchResult | CustomMatchResult)[];
type PageSearcherConfig = {
    currentLang: string;
    currentVersion: string;
    extractGroupName: (path: string) => string;
};
type SearchOptions = (LocalSearchOptions | RemoteSearchOptions) & PageSearcherConfig;
type BeforeSearch = (query: string) => string | Promise<string> | void;
type OnSearch = (query: string, matchedResult: DefaultMatchResult[]) => {
    group: string;
    result: unknown;
    renderType?: RenderType;
}[] | Promise<{
    group: string;
    result: unknown;
    renderType?: RenderType;
}[]> | void;
type AfterSearch = (query: string, matchedResult: MatchResult) => void | Promise<void>;
type RenderSearchFunction<T = unknown> = (result: T) => JSX.Element;

declare function Aside(props: {
    headers: Header[];
    outlineTitle: string;
}): react_jsx_runtime.JSX.Element;

interface BadgeProps {
    /**
     * The content to display inside the badge. Can be a string or React nodes.
     */
    children?: React.ReactNode;
    /**
     * The type of badge, which determines its color and style.
     * @default 'tip'
     */
    type?: 'tip' | 'info' | 'warning' | 'danger';
    /**
     * The text content to display inside the badge (for backwards compatibility).
     */
    text?: string;
    /**
     * Whether to display the badge with an outline style.
     * @default false
     */
    outline?: boolean;
}
/**
 * A component that renders a styled badge with custom content.
 *
 * The Badge component displays a small, inline element with customizable content and appearance.
 * It's useful for highlighting status, categories, or other short pieces of information.
 *
 * @param {BadgeProps} props - The properties for the Badge component.
 * @returns {JSX.Element} A span element representing the badge.
 *
 * @example
 * Using children:
 * <Badge type="info">New</Badge>
 * <Badge type="warning" outline>Experimental</Badge>
 * <Badge type="danger">Deprecated</Badge>
 * <Badge type="tip" outline><strong>Pro Tip:</strong> Use custom elements</Badge>
 *
 * Using text prop:
 * <Badge text="New" type="info" />
 * <Badge text="Experimental" type="warning" outline />
 * <Badge text="Deprecated" type="danger" />
 */
declare function Badge({ children, type, text, outline, }: BadgeProps): react_jsx_runtime.JSX.Element;

interface ButtonProps {
    type?: string;
    size?: 'medium' | 'big';
    theme?: 'brand' | 'alt';
    text: string | React$1.ReactNode;
    href?: string;
    external?: boolean;
    className?: string;
}
declare function Button(props: ButtonProps): React$1.CElement<{
    className: string;
    href: string;
}, React$1.Component<{
    className: string;
    href: string;
}, any, any>>;

interface CardProps {
    /**
     * The title of the card.
     */
    title: React.ReactNode;
    /**
     * The content to display inside the card.
     */
    content?: React.ReactNode;
    /**
     * The icon of the card.
     */
    icon?: React.ReactNode;
    /**
     * The style of the card.
     */
    style?: React.CSSProperties;
}
declare function Card({ content, title, icon, style }: CardProps): react_jsx_runtime.JSX.Element;

declare function DocFooter(): react_jsx_runtime.JSX.Element;

declare function EditLink(): react_jsx_runtime.JSX.Element | null;

declare function HomeFeature({ frontmatter, routePath, }: {
    frontmatter: FrontMatterMeta;
    routePath: string;
}): react_jsx_runtime.JSX.Element;

declare function HomeFooter(): react_jsx_runtime.JSX.Element | null;

declare function HomeHero({ frontmatter, routePath, }: {
    frontmatter: FrontMatterMeta;
    routePath: string;
}): react_jsx_runtime.JSX.Element;

declare function LastUpdated(): react_jsx_runtime.JSX.Element;

interface LinkProps extends ComponentProps<'a'> {
    href?: string;
    children?: React$1.ReactNode;
    className?: string;
    onNavigate?: () => void;
    keepCurrentParams?: boolean;
}
declare function Link(props: LinkProps): react_jsx_runtime.JSX.Element;

interface LinkCardProps {
    /**
     * The URL of the link.
     */
    href: string;
    /**
     * The title of the link.
     */
    title: string;
    /**
     * The description of the link.
     */
    description?: React.ReactNode;
    /**
     * The style of the link card.
     */
    style?: React.CSSProperties;
}
declare function LinkCard(props: LinkCardProps): react_jsx_runtime.JSX.Element;

interface GroupItem {
    text: string;
    link: string;
    headers?: Header[];
}
interface Group {
    name: string;
    items: GroupItem[];
}
declare function Overview(props: {
    content?: React.ReactNode;
    groups?: Group[];
    defaultGroupTitle?: string;
    overviewHeaders?: number[];
}): react_jsx_runtime.JSX.Element;

interface PackageManagerTabProps {
    command: string | {
        npm?: string;
        yarn?: string;
        pnpm?: string;
        bun?: string;
    };
    additionalTabs?: {
        tool: string;
        icon?: ReactNode;
    }[];
}
declare function PackageManagerTabs({ command, additionalTabs, }: PackageManagerTabProps): react_jsx_runtime.JSX.Element;

interface PrevNextPageProps {
    type: 'prev' | 'next';
    text: string;
    href: string;
}
declare function PrevNextPage(props: PrevNextPageProps): react_jsx_runtime.JSX.Element;

declare function ScrollToTop(): react_jsx_runtime.JSX.Element;

interface SearchPanelProps {
    focused: boolean;
    setFocused: (focused: boolean) => void;
}
declare function SearchPanel({ focused, setFocused }: SearchPanelProps): react_jsx_runtime.JSX.Element;

declare function Search(): react_jsx_runtime.JSX.Element;

interface Props {
    isSidebarOpen?: boolean;
    beforeSidebar?: React.ReactNode;
    afterSidebar?: React.ReactNode;
    uiSwitch?: UISwitchResult;
    navTitle?: React.ReactNode;
}
type SidebarData = (SidebarDivider | SidebarItem | NormalizedSidebarGroup)[];
declare function Sidebar(props: Props): react_jsx_runtime.JSX.Element;
declare function SidebarList({ sidebarData, setSidebarData, }: {
    sidebarData: SidebarData;
    setSidebarData: React.Dispatch<React.SetStateAction<SidebarData>>;
}): react_jsx_runtime.JSX.Element;

declare const SocialLinks: ({ socialLinks }: {
    socialLinks: SocialLink[];
}) => react_jsx_runtime.JSX.Element;

interface SourceCodeProps {
    href: string;
    platform?: 'github' | 'gitlab';
}
declare function SourceCode(props: SourceCodeProps): react_jsx_runtime.JSX.Element;

declare function Steps({ children }: {
    children: ReactNode;
}): react_jsx_runtime.JSX.Element;

declare function SwitchAppearance({ onClick }: {
    onClick?: () => void;
}): react_jsx_runtime.JSX.Element;

type TabItem = {
    value?: string;
    label?: string | ReactNode;
    disabled?: boolean;
};
interface TabsProps {
    values?: ReactNode[] | ReadonlyArray<ReactNode> | TabItem[];
    defaultValue?: string;
    onChange?: (index: number) => void;
    children: ReactNode;
    groupId?: string;
    tabContainerClassName?: string;
    tabPosition?: 'left' | 'center';
}
declare const Tabs: ForwardRefExoticComponent<TabsProps>;
declare function Tab({ children, ...props }: ComponentPropsWithRef<'div'> & Pick<TabItem, 'label' | 'value'>): ReactElement;

declare const Tag: ({ tag }: {
    tag?: string;
}) => react_jsx_runtime.JSX.Element | null;

declare function Toc({ onItemClick, }: {
    onItemClick?: (header: Header) => void;
}): react_jsx_runtime.JSX.Element;

declare const _default: {
    Layout: React$1.FC<LayoutProps>;
    NotFoundLayout: typeof NotFoundLayout;
    HomeLayout: typeof HomeLayout;
    setup: typeof setup;
};

export { type AfterSearch, Aside, Badge, type BeforeSearch, Button, Card, type CustomMatchResult, type DefaultMatchResult, type DefaultMatchResultItem, DocFooter, DocLayout, EditLink, type HighlightInfo, HomeFeature, HomeFooter, HomeHero, HomeLayout, LastUpdated, Layout, Link, LinkCard, type MatchResult, Nav, NotFoundLayout, type OnSearch, Overview, PackageManagerTabs, type PageSearcherConfig, PrevNextPage, type RenderSearchFunction, RenderType, ScrollToTop, Search, type SearchOptions, SearchPanel, Sidebar, type SidebarData, SidebarList, SocialLinks, SourceCode, Steps, SwitchAppearance, Tab, Tabs, Tag, Toc, type UserMatchResultItem, bindingAsideScroll, _default as default, getCustomMDXComponent, isActive, isMobileDevice, parseInlineMarkdownText, renderHtmlOrText, renderInlineMarkdown, scrollToTarget, setup, useEditLink, useEnableNav, useFullTextSearch, useHiddenNav, useLocaleSiteData, usePathUtils, usePrevNextPage, useRedirect4FirstVisit, useSidebarData, useThemeState };
