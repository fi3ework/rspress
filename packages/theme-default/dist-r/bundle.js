import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
import * as __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__ from "react/jsx-runtime";
import * as __WEBPACK_EXTERNAL_MODULE__mdx_js_react_0d3abecb__ from "@mdx-js/react";
import * as __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__ from "@rspress/runtime";
import * as __WEBPACK_EXTERNAL_MODULE__theme_75e53063__ from "@theme";
import * as __WEBPACK_EXTERNAL_MODULE_github_slugger_8e9a17cb__ from "github-slugger";
import * as __WEBPACK_EXTERNAL_MODULE_lodash_es_18c59938__ from "lodash-es";
import * as __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__ from "@rspress/shared";
import * as __WEBPACK_EXTERNAL_MODULE_htmr__ from "htmr";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_arrow_right_3f3bb17d__ from "@theme-assets/arrow-right";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_menu_9c72640c__ from "@theme-assets/menu";
import "nprogress/nprogress.css";
import * as __WEBPACK_EXTERNAL_MODULE_react_helmet_async_048d06c6__ from "react-helmet-async";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_wrap_367cf3a3__ from "@theme-assets/wrap";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_wrapped_01fc4d47__ from "@theme-assets/wrapped";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_copy_ebc8477b__ from "@theme-assets/copy";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_success_55638e57__ from "@theme-assets/success";
import * as __WEBPACK_EXTERNAL_MODULE_copy_to_clipboard_b679b6a5__ from "copy-to-clipboard";
import * as __WEBPACK_EXTERNAL_MODULE_react_syntax_highlighter_bbd3b718__ from "react-syntax-highlighter";
import * as __WEBPACK_EXTERNAL_MODULE_virtual_prism_languages_a6edd1ed__ from "virtual-prism-languages";
import * as __WEBPACK_EXTERNAL_MODULE_flexsearch_dist_module_document_909c0944__ from "flexsearch/dist/module/document";
import * as __WEBPACK_EXTERNAL_MODULE_virtual_search_index_hash_00b0989e__ from "virtual-search-index-hash";
import * as __WEBPACK_EXTERNAL_MODULE_virtual_site_data_fa42d4c0__ from "virtual-site-data";
import * as __WEBPACK_EXTERNAL_MODULE_nprogress__ from "nprogress";
import * as __WEBPACK_EXTERNAL_MODULE_virtual_routes_98776429__ from "virtual-routes";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_small_menu_b89c442a__ from "@theme-assets/small-menu";
import * as __WEBPACK_EXTERNAL_MODULE_body_scroll_lock_935fd51e__ from "body-scroll-lock";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_translator_e1217f67__ from "@theme-assets/translator";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_arrow_down_f924fb68__ from "@theme-assets/arrow-down";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_moon_c120f886__ from "@theme-assets/moon";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_sun_beb20915__ from "@theme-assets/sun";
import * as __WEBPACK_EXTERNAL_MODULE_react_dom_7136dc57__ from "react-dom";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_down_345b1d5d__ from "@theme-assets/down";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_search_1c295ce0__ from "@theme-assets/search";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_close_bcac2df4__ from "@theme-assets/close";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_loading_5f550a25__ from "@theme-assets/loading";
import * as __WEBPACK_EXTERNAL_MODULE_virtual_search_hooks_9d01d01f__ from "virtual-search-hooks";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_empty_326d8860__ from "@theme-assets/empty";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_file_9182f35f__ from "@theme-assets/file";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_header_54924fa3__ from "@theme-assets/header";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_jump_20d3ca88__ from "@theme-assets/jump";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_title_56a7311e__ from "@theme-assets/title";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_github_cac38251__ from "@theme-assets/github";
import * as __WEBPACK_EXTERNAL_MODULE__theme_assets_gitlab_a0e4f082__ from "@theme-assets/gitlab";
function useEnableNav() {
    const { siteData: { themeConfig }, page: { frontmatter = {} } } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const initialState = (frontmatter?.navbar ?? true) && themeConfig?.hideNavbar !== 'always';
    const [enableNav, setEnableNav] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(initialState);
    return [
        enableNav,
        setEnableNav
    ];
}
function useHiddenNav() {
    const { siteData: { themeConfig } } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const hiddenBehavior = themeConfig.hideNavbar ?? 'never';
    const [hiddenNav, setHiddenNav] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const { pathname } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const lastScrollTop = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(0);
    if ('never' === hiddenBehavior) return false;
    if ('always' === hiddenBehavior) return true;
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        setHiddenNav(false);
        const onScrollListen = (0, __WEBPACK_EXTERNAL_MODULE_lodash_es_18c59938__.throttle)(()=>{
            const { scrollTop } = document.documentElement;
            if (scrollTop === lastScrollTop.current) return;
            const shouldHidden = lastScrollTop.current > 0 && scrollTop - lastScrollTop.current > 0;
            setHiddenNav(shouldHidden);
            lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
        }, 200);
        window.addEventListener('scroll', onScrollListen);
        return ()=>{
            window.removeEventListener('scroll', onScrollListen);
        };
    }, [
        pathname
    ]);
    return hiddenNav;
}
const DEFAULT_NAV_HEIGHT = 72;
function getTargetTop(element, fallbackHeight = DEFAULT_NAV_HEIGHT) {
    const targetPadding = Number.parseInt(window.getComputedStyle(element).paddingTop, 10);
    const targetTop = window.scrollY + element.getBoundingClientRect().top - fallbackHeight - targetPadding;
    return Math.round(targetTop);
}
function scrollToTarget(target, isSmooth, fallbackHeight = DEFAULT_NAV_HEIGHT) {
    window.scrollTo({
        left: 0,
        top: getTargetTop(target, fallbackHeight),
        ...isSmooth ? {
            behavior: 'smooth'
        } : {}
    });
}
function bindingWindowScroll() {
    function scrollTo(el, hash, isSmooth = false) {
        let target = null;
        try {
            target = el.classList.contains('header-anchor') ? el : document.getElementById(decodeURIComponent(hash.slice(1)));
        } catch (e) {
            console.warn(e);
        }
        if (target) scrollToTarget(target, isSmooth);
    }
    window.addEventListener('click', (e)=>{
        const link = e.target.closest('a');
        if (link) {
            const { origin, hash, target, pathname, search } = link;
            const currentUrl = window.location;
            if (hash && '_blank' !== target && origin === currentUrl.origin) {
                if (pathname === currentUrl.pathname && search === currentUrl.search && hash && link.classList.contains('header-anchor')) {
                    e.preventDefault();
                    history.pushState(null, '', hash);
                    scrollTo(link, hash, true);
                    window.dispatchEvent(new Event('hashchange'));
                } else window.addEventListener('RspressReloadContent', ()=>{
                    if (location.hash.length > 1) {
                        const ele = document.getElementById(location.hash.slice(1));
                        scrollToTarget(ele, false);
                    }
                });
            }
        }
    }, {
        capture: true
    });
    window.addEventListener('hashchange', (e)=>{
        e.preventDefault();
    });
}
function bindingAsideScroll() {
    function isBottom() {
        return document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight;
    }
    const aside = document.getElementById('aside-container');
    const links = Array.from(document.querySelectorAll('.rspress-doc .header-anchor')).filter((item)=>item.parentElement?.tagName !== 'H1');
    if (!aside || !links.length) return;
    let prevActiveLink = null;
    const headers = Array.from(aside?.getElementsByTagName('a') || []).map((item)=>decodeURIComponent(item.hash));
    if (!headers.length) return;
    const activate = (links, index)=>{
        if (links[index]) {
            const id = links[index].getAttribute('href');
            const currentLink = aside?.querySelector(`a[href="#${id?.slice(1)}"]`);
            if (currentLink) {
                if (prevActiveLink) prevActiveLink.classList.remove('aside-active');
                prevActiveLink = currentLink;
                prevActiveLink.classList.add('aside-active');
            }
        }
    };
    const setActiveLink = ()=>{
        if (isBottom()) activate(links, links.length - 1);
        else for(let i = 0; i < links.length; i++){
            const currentAnchor = links[i];
            const nextAnchor = links[i + 1];
            const scrollTop = Math.ceil(window.scrollY);
            const currentAnchorTop = getTargetTop(currentAnchor.parentElement);
            if (0 === i && scrollTop < currentAnchorTop || 0 === scrollTop) {
                activate(links, 0);
                break;
            }
            if (!nextAnchor) {
                activate(links, i);
                break;
            }
            const nextAnchorTop = getTargetTop(nextAnchor.parentElement);
            if (scrollTop >= currentAnchorTop && scrollTop < nextAnchorTop) {
                activate(links, i);
                break;
            }
        }
    };
    const throttledSetLink = (0, __WEBPACK_EXTERNAL_MODULE_lodash_es_18c59938__.throttle)(setActiveLink, 200);
    window.addEventListener('scroll', throttledSetLink);
    setActiveLink();
    return ()=>{
        if (prevActiveLink) prevActiveLink.classList.remove('aside-active');
        window.removeEventListener('scroll', throttledSetLink);
    };
}
function setup() {
    if (!(0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.inBrowser)()) return;
    bindingWindowScroll();
}
function utils_isActive(currentPath, targetLink, strict = false) {
    if (!targetLink) return false;
    if (strict) return (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)(currentPath, targetLink) || (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)(currentPath, `${targetLink}/index`);
    return (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)(currentPath, targetLink) || currentPath.startsWith(targetLink);
}
function isMobileDevice() {
    return window.innerWidth <= 1024;
}
function renderHtmlOrText(str) {
    if (!str) return '';
    if ('number' == typeof str) return str;
    const hasValidHtmlElements = /<([a-z]+)([^<]*)(?:>(.*?)<\/\1>|\s*\/>)/i.test(str);
    if (hasValidHtmlElements) return (0, __WEBPACK_EXTERNAL_MODULE_htmr__["default"])(str);
    return str.replace(/\\</g, '<').replace(/\\>/g, '>').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
const CODE_TEXT_PATTERN = /`(.*?)`/g;
const STRONG_TEXT_PATTERN = /\*{2}(?!\*)(.*?)\*{2}(?!\*)/g;
const EMPHASIS_TEXT_PATTERN = /\*(?!\*)(.*?)\*(?!\*)/g;
const DELETE_TEXT_PATTERN = /\~{2}(.*?)\~{2}/g;
function renderInlineMarkdown(text) {
    const htmlText = text.replace(/`[^`]+`/g, (match)=>match.replace(/</g, '&lt;')).replace(STRONG_TEXT_PATTERN, '<strong>$1</strong>').replace(EMPHASIS_TEXT_PATTERN, '<em>$1</em>').replace(DELETE_TEXT_PATTERN, '<del>$1</del>').replace(CODE_TEXT_PATTERN, '<code>$1</code>');
    return renderHtmlOrText(htmlText);
}
function parseInlineMarkdownText(mdx) {
    return mdx.replace(STRONG_TEXT_PATTERN, '$1').replace(EMPHASIS_TEXT_PATTERN, '$1').replace(DELETE_TEXT_PATTERN, '$1').replace(CODE_TEXT_PATTERN, '$1');
}
function Aside(props) {
    const { headers } = props;
    const hasOutline = headers.length > 0;
    const baseHeaderLevel = headers[0]?.depth || 2;
    const hiddenNav = useHiddenNav();
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        let unbinding;
        setTimeout(()=>{
            unbinding = bindingAsideScroll();
        }, 100);
        const hash = decodeURIComponent(window.location.hash);
        if (hash) {
            const target = document.getElementById(hash.slice(1));
            if (target) scrollToTarget(target, false, hiddenNav ? 0 : DEFAULT_NAV_HEIGHT);
        } else window.scrollTo(0, 0);
        return ()=>{
            if (unbinding) unbinding();
        };
    }, [
        headers
    ]);
    const renderHeader = (header)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("li", {
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("a", {
                href: `#${header.id}`,
                title: parseInlineMarkdownText(header.text),
                className: "aside-link transition-all duration-300 hover:text-text-1 text-text-2 block",
                style: {
                    marginLeft: (header.depth - baseHeaderLevel) * 12,
                    fontWeight: 'semibold'
                },
                onClick: (e)=>{
                    e.preventDefault();
                    window.location.hash = header.id;
                    const target = document.getElementById(header.id);
                    if (target) scrollToTarget(target, false, hiddenNav ? 0 : DEFAULT_NAV_HEIGHT);
                },
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                    className: "aside-link-text block",
                    children: renderInlineMarkdown(header.text)
                })
            })
        }, header.id);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: "flex flex-col",
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: hasOutline ? '<lg:hidden' : 'hidden',
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                id: "aside-container",
                className: "relative text-sm font-medium",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: "leading-7 block text-sm font-semibold pl-3",
                        children: props.outlineTitle
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("nav", {
                        className: "mt-1",
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("ul", {
                            className: "relative",
                            children: headers.map(renderHeader)
                        })
                    })
                ]
            })
        })
    });
}
function useLocaleSiteData() {
    const pageData = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { page: { lang } } = pageData;
    const themeConfig = pageData?.siteData?.themeConfig ?? {};
    const defaultLang = pageData.siteData.lang ?? '';
    const locales = themeConfig?.locales;
    if (!locales || 0 === locales.length) return {
        nav: themeConfig.nav,
        sidebar: themeConfig.sidebar,
        prevPageText: themeConfig.prevPageText,
        nextPageText: themeConfig.nextPageText,
        sourceCodeText: themeConfig.sourceCodeText,
        searchPlaceholderText: themeConfig.searchPlaceholderText,
        searchNoResultsText: themeConfig.searchNoResultsText,
        searchSuggestedQueryText: themeConfig.searchSuggestedQueryText,
        overview: themeConfig.overview
    };
    const localeInfo = locales.find((locale)=>locale.lang === lang);
    return {
        ...localeInfo,
        langRoutePrefix: lang === defaultLang ? '/' : (0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.addTrailingSlash)(lang)
    };
}
const matchPath = (pattern, currentPathname)=>{
    const prefix = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(pattern);
    if (prefix === currentPathname) return true;
    const prefixWithTrailingSlash = (0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.addTrailingSlash)(prefix);
    return currentPathname.startsWith(prefixWithTrailingSlash);
};
const useSidebarData_match = (item, currentPathname)=>{
    const isLink = 'link' in item && '' !== item.link;
    const isDir = 'items' in item;
    if (!isDir && isLink) {
        if ((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(item.link), currentPathname)) return item;
        if (currentPathname.includes('index') && (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)(`${item.link}/index`, currentPathname)) return item;
    }
    if (isDir) {
        if (isLink && ((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(item.link), currentPathname) || (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(`${item.link}/index`), currentPathname))) return item;
        for (const childItem of item.items){
            const matched = useSidebarData_match(childItem, currentPathname);
            if (matched) return matched;
        }
    }
};
const getSidebarData = (sidebar, currentPathname)=>{
    for (const name of Object.keys(sidebar))if (matchPath(name, currentPathname)) {
        const sidebarGroup = sidebar[name];
        const group = sidebarGroup.find((item)=>useSidebarData_match(item, currentPathname));
        return {
            group: group && 'text' in group ? group.text : '',
            items: sidebarGroup
        };
    }
    return {
        group: 'Documentation',
        items: []
    };
};
function useSidebarData() {
    const { sidebar } = useLocaleSiteData();
    const { pathname: rawPathname } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const pathname = decodeURIComponent(rawPathname);
    const sidebarData = (0, __WEBPACK_EXTERNAL_MODULE_react__.useMemo)(()=>getSidebarData(sidebar, pathname), [
        sidebar,
        pathname
    ]);
    return sidebarData;
}
function usePrevNextPage() {
    const { pathname } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const { items } = useSidebarData();
    const flattenTitles = [];
    const walk = (sidebarItem)=>{
        if ('items' in sidebarItem) {
            if (sidebarItem.link) flattenTitles.push({
                text: sidebarItem.text,
                link: sidebarItem.link
            });
            sidebarItem.items.forEach((item)=>{
                'dividerType' in item || walk(item);
            });
        } else flattenTitles.push(sidebarItem);
    };
    items.forEach((item)=>!('dividerType' in item) && walk(item));
    const pageIndex = flattenTitles.findIndex((item)=>(0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(item.link), pathname));
    const prevPage = flattenTitles[pageIndex - 1] || null;
    const nextPage = flattenTitles[pageIndex + 1] || null;
    return {
        prevPage,
        nextPage
    };
}
const index_module = {
    pager: "pager_d6903",
    "has-next": "has-next_e91b1",
    hasNext: "has-next_e91b1",
    prev: "prev_c92d1",
    next: "next_c11be"
};
function DocFooter() {
    const { prevPage, nextPage } = usePrevNextPage();
    const { lastUpdated: localesLastUpdated = false } = useLocaleSiteData();
    const { siteData } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { themeConfig } = siteData;
    const showLastUpdated = themeConfig.lastUpdated || localesLastUpdated;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("footer", {
        className: "mt-8",
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "xs:flex pb-5 px-2 justify-end items-center",
                children: showLastUpdated && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.LastUpdated, {})
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "flex flex-col",
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.EditLink, {})
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "flex flex-col sm:flex-row sm:justify-around gap-4 pt-6",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: `${index_module.prev} flex flex-col`,
                        children: prevPage ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.PrevNextPage, {
                            type: "prev",
                            text: prevPage.text,
                            href: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(prevPage.link)
                        }) : null
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: `${index_module.next} flex flex-col`,
                        children: nextPage ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.PrevNextPage, {
                            type: "next",
                            text: nextPage.text,
                            href: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(nextPage.link)
                        }) : null
                    })
                ]
            })
        ]
    });
}
function SvgWrapper({ icon: Icon, ...rest }) {
    if (!Icon) return null;
    if ('string' == typeof Icon) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
        src: Icon,
        alt: "",
        ...rest
    });
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Icon, {
        ...rest
    });
}
function SideMenu({ outlineTitle, beforeSidebar, afterSidebar, uiSwitch, navTitle }) {
    const [isSidebarOpen, setSidebarIsOpen] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const [isTocOpen, setIsTocOpen] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const tocContainerRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const outlineButtonRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const { pathname } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    function openSidebar() {
        setSidebarIsOpen(true);
    }
    function closeSidebar() {
        setSidebarIsOpen(false);
    }
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        setSidebarIsOpen(false);
    }, [
        pathname
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        document.addEventListener('mouseup', handleClickOutsideForToc);
        document.addEventListener('touchend', handleClickOutsideForToc);
        return ()=>{
            document.addEventListener('mouseup', handleClickOutsideForToc);
            document.removeEventListener('touchend', handleClickOutsideForToc);
        };
    }, []);
    const handleClickOutsideForToc = (e)=>{
        const { current: outlineButton } = outlineButtonRef;
        if (outlineButton?.contains(e.target)) return;
        const { current: tocContainer } = tocContainerRef;
        if (tocContainer && !tocContainer.contains(e.target)) setIsTocOpen(false);
    };
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react__.Fragment, {
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "rspress-sidebar-menu",
                children: [
                    uiSwitch?.showSidebar ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("button", {
                        onClick: openSidebar,
                        className: "flex-center mr-auto",
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                                className: "text-md mr-2",
                                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                                    icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_menu_9c72640c__["default"]
                                })
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                                className: "text-sm",
                                children: "Menu"
                            })
                        ]
                    }) : null,
                    uiSwitch?.showAside ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react__.Fragment, {
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("button", {
                                onClick: ()=>setIsTocOpen((tocOpened)=>!tocOpened),
                                className: "flex-center ml-auto",
                                ref: outlineButtonRef,
                                children: [
                                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                                        className: "text-sm",
                                        children: outlineTitle
                                    }),
                                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                                        className: "text-md mr-2",
                                        style: {
                                            transform: isTocOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.2s ease-out',
                                            marginTop: '2px'
                                        },
                                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                                            icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_arrow_right_3f3bb17d__["default"]
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                                className: `rspress-local-toc-container ${isTocOpen ? 'rspress-local-toc-container-show' : ''}`,
                                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Toc, {
                                    onItemClick: ()=>{
                                        setIsTocOpen(false);
                                    }
                                })
                            })
                        ]
                    }) : null
                ]
            }),
            uiSwitch?.showSidebar ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react__.Fragment, {
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Sidebar, {
                        isSidebarOpen: isSidebarOpen,
                        beforeSidebar: beforeSidebar,
                        afterSidebar: afterSidebar,
                        uiSwitch: uiSwitch,
                        navTitle: navTitle
                    }),
                    isSidebarOpen ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        onClick: closeSidebar,
                        className: "rspress-sidebar-back-drop",
                        style: {
                            background: 'rgba(0, 0, 0, 0.6)'
                        }
                    }) : null
                ]
            }) : null
        ]
    });
}
const TabDataContext = (0, __WEBPACK_EXTERNAL_MODULE_react__.createContext)({
    tabData: {},
    setTabData: ()=>{}
});
function usePathUtils() {
    const currentLang = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLang)();
    const currentVersion = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useVersion)();
    const pageData = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const defaultLang = pageData.siteData.lang;
    const defaultVersion = pageData.siteData.multiVersion.default;
    const normalizeLinkHref = (rawHref)=>{
        let href = rawHref;
        if ((defaultLang || defaultVersion) && !(0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.isExternalUrl)(href) && !href.startsWith('#')) {
            href = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.removeBase)(href);
            const linkParts = href.split('/').filter(Boolean);
            let versionPart = '';
            let langPart = '';
            let purePathPart = '';
            if (defaultVersion) {
                if (currentVersion !== defaultVersion) {
                    versionPart = currentVersion;
                    if (linkParts[0] === currentVersion) linkParts.shift();
                } else if (linkParts[0] === defaultVersion) linkParts.shift();
            }
            if (defaultLang) {
                if (currentLang !== defaultLang) {
                    langPart = currentLang;
                    if (linkParts[0] === currentLang) linkParts.shift();
                } else if (linkParts[0] === defaultLang) linkParts.shift();
            }
            purePathPart = linkParts.join('/');
            return (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)([
                versionPart,
                langPart,
                purePathPart
            ].filter(Boolean).join('/')));
        }
        return href;
    };
    return {
        normalizeLinkHref
    };
}
const docComponents_index_module = {
    title: "title_fb7eb",
    blockquote: "blockquote_f1063",
    link: "link_a9ef4",
    "inline-link": "inline-link_f855c",
    inlineLink: "inline-link_f855c"
};
const A = (props)=>{
    const { href = '', className = '' } = props;
    const { normalizeLinkHref } = usePathUtils();
    const hasHeaderAnchor = className.includes('header-anchor');
    if (hasHeaderAnchor || href.startsWith('#')) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("a", {
        ...props,
        className: `${docComponents_index_module.link} ${className}`
    });
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Link, {
        ...props,
        className: `${className} ${docComponents_index_module.link} ${docComponents_index_module["inline-link"]}`,
        href: normalizeLinkHref(href)
    });
};
const H1 = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h1", {
        ...props,
        className: `rspress-doc-title text-3xl mb-10 leading-10 tracking-tight ${docComponents_index_module.title}`
    });
const H2 = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h2", {
        ...props,
        className: `mt-12 mb-6 pt-8 text-2xl tracking-tight border-t-[1px] border-divider-light ${docComponents_index_module.title}`
    });
const H3 = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h3", {
        ...props,
        className: `mt-10 mb-2 leading-7 text-xl ${docComponents_index_module.title}`
    });
const H4 = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h4", {
        ...props,
        className: `mt-8 leading-6 text-lg ${docComponents_index_module.title}`
    });
const H5 = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h5", {
        ...props,
        className: docComponents_index_module.title
    });
const H6 = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h6", {
        ...props,
        className: docComponents_index_module.title
    });
const DocLayout_index_module = {
    "aside-container": "aside-container_bc5fa",
    asideContainer: "aside-container_bc5fa",
    "fade-out": "fade-out_cfa8c",
    fadeOut: "fade-out_cfa8c",
    "fade-in": "fade-in_b8f53",
    fadeIn: "fade-in_b8f53",
    docLayout: "docLayout_af141",
    content: "content_ff766"
};
function DocLayout(props) {
    const { beforeDocFooter, afterDocFooter, beforeDoc, afterDoc, beforeDocContent, afterDocContent, beforeOutline, afterOutline, beforeSidebar, afterSidebar, uiSwitch, navTitle, components } = props;
    const { siteData, page } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { headingTitle, title, toc = [], frontmatter } = page;
    const [tabData, setTabData] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)({});
    const headers = toc;
    const { themeConfig } = siteData;
    const enableScrollToTop = themeConfig.enableScrollToTop ?? false;
    const localesData = useLocaleSiteData();
    const outlineTitle = localesData?.outlineTitle || themeConfig?.outlineTitle || 'ON THIS PAGE';
    const isOverviewPage = frontmatter?.overview ?? false;
    const mdxComponents = {
        ...(0, __WEBPACK_EXTERNAL_MODULE__theme_75e53063__.getCustomMDXComponent)(),
        ...components
    };
    const docContent = /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(TabDataContext.Provider, {
        value: {
            tabData,
            setTabData
        },
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__mdx_js_react_0d3abecb__.MDXProvider, {
            components: mdxComponents,
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.Content, {})
        })
    });
    const fallbackTitle = (0, __WEBPACK_EXTERNAL_MODULE_react__.useMemo)(()=>{
        const titleSlug = title && (0, __WEBPACK_EXTERNAL_MODULE_github_slugger_8e9a17cb__.slug)(title);
        return false !== siteData.themeConfig.fallbackHeadingTitle && !headingTitle && titleSlug && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(H1, {
            id: titleSlug,
            children: [
                title,
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(A, {
                    className: "header-anchor",
                    href: `#${titleSlug}`,
                    "aria-hidden": true,
                    children: "#"
                })
            ]
        });
    }, [
        headingTitle,
        title
    ]);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: `${DocLayout_index_module.docLayout} pt-0`,
        style: {
            ...uiSwitch?.showNavbar ? {} : {
                marginTop: 0
            }
        },
        children: [
            beforeDoc,
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SideMenu, {
                outlineTitle: outlineTitle,
                beforeSidebar: beforeSidebar,
                afterSidebar: afterSidebar,
                uiSwitch: uiSwitch,
                navTitle: navTitle
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: `${DocLayout_index_module.content} rspress-doc-container flex flex-shrink-0 mx-auto`,
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: "w-full flex-1",
                        children: isOverviewPage ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
                            children: [
                                beforeDocContent,
                                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Overview, {
                                    content: docContent
                                }),
                                afterDocContent
                            ]
                        }) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                                    className: "rspress-doc",
                                    children: [
                                        beforeDocContent,
                                        fallbackTitle,
                                        docContent,
                                        afterDocContent
                                    ]
                                }),
                                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                                    className: "rspress-doc-footer",
                                    children: [
                                        beforeDocFooter,
                                        uiSwitch?.showDocFooter && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(DocFooter, {}),
                                        afterDocFooter
                                    ]
                                })
                            ]
                        })
                    }),
                    enableScrollToTop && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.NoSSR, {
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.ScrollToTop, {})
                    }),
                    uiSwitch?.showAside ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: DocLayout_index_module.asideContainer,
                        style: {
                            ...uiSwitch?.showNavbar ? {} : {
                                marginTop: 0,
                                paddingTop: '32px'
                            }
                        },
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                            children: [
                                beforeOutline,
                                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Aside, {
                                    headers: headers,
                                    outlineTitle: outlineTitle
                                }),
                                afterOutline
                            ]
                        })
                    }) : null
                ]
            }),
            afterDoc
        ]
    });
}
function HomeLayout(props) {
    const { beforeHero, afterHero, beforeFeatures, afterFeatures } = props;
    const { page: { frontmatter, routePath } } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "relative",
        style: {
            minHeight: 'calc(100vh - var(--rp-nav-height))',
            paddingBottom: '80px'
        },
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "pb-12",
                children: [
                    beforeHero,
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.HomeHero, {
                        frontmatter: frontmatter,
                        routePath: routePath
                    }),
                    afterHero,
                    beforeFeatures,
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.HomeFeature, {
                        frontmatter: frontmatter,
                        routePath: routePath
                    }),
                    afterFeatures
                ]
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.HomeFooter, {})
        ]
    });
}
function useRedirect4FirstVisit() {
    const { siteData, page } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const defaultLang = siteData.lang || '';
    const localeLanguages = Object.values(siteData.themeConfig.locales || {});
    const langs = localeLanguages.map((item)=>item.lang) || [];
    const currentLang = page.lang;
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        const localeRedirect = siteData.themeConfig.localeRedirect ?? 'auto';
        if ('auto' !== localeRedirect) return;
        if (!defaultLang || '1' === process.env.TEST) return;
        const botRegex = /bot|spider|crawl|lighthouse/i;
        if (botRegex.test(window.navigator.userAgent)) return;
        const { pathname, search } = window.location;
        const cleanPathname = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.removeBase)(pathname);
        const FIRST_VISIT_KEY = 'rspress-visited';
        const visited = localStorage.getItem(FIRST_VISIT_KEY);
        if (visited) return;
        localStorage.setItem(FIRST_VISIT_KEY, '1');
        const targetLang = window.navigator.language.split('-')[0];
        if (!langs.includes(targetLang)) return;
        if (targetLang === currentLang) return;
        let newPath;
        newPath = targetLang === defaultLang ? pathname.replace(`/${currentLang}`, '') : currentLang === defaultLang ? (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(`/${targetLang}${cleanPathname}`) : pathname.replace(`/${currentLang}`, `/${targetLang}`);
        if (newPath) window.location.replace(newPath + search);
    }, []);
}
function useUISwitch() {
    const { page, siteData } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { frontmatter } = page;
    const { themeConfig } = siteData;
    const localesData = useLocaleSiteData();
    const location1 = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const isOverviewPage = frontmatter?.overview ?? false;
    const getShowAside = ()=>{
        const defaultHasAside = 'undefined' == typeof window || window.top === window.self;
        return (frontmatter?.outline ?? themeConfig?.outline ?? defaultHasAside) && !isOverviewPage;
    };
    const [showNavbar, setShowNavbar] = useEnableNav();
    const [showAside, setShowAside] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(getShowAside());
    const [showDocFooter, setShowDocFooter] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(frontmatter?.footer ?? true);
    const sidebar = localesData.sidebar || {};
    const showSidebar = frontmatter?.sidebar !== false && Object.keys(sidebar).length > 0;
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        setShowAside(getShowAside());
    }, [
        page,
        siteData
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        const query = new URLSearchParams(location1.search);
        const documentStyle = document.documentElement.style;
        const originalSidebarWidth = documentStyle.getPropertyValue('--rp-sidebar-width');
        const originalAsideWidth = documentStyle.getPropertyValue('--rp-aside-width');
        const originNavbar = showNavbar;
        const originDocFooter = showDocFooter;
        const navbar = query.get('navbar');
        const sidebar = query.get('sidebar');
        const aside = query.get('outline');
        const footer = query.get('footer');
        if ("0" === navbar) setShowNavbar(false);
        if ("0" === sidebar) document.documentElement.style.setProperty('--rp-sidebar-width', '0px');
        if ("0" === aside) document.documentElement.style.setProperty('--rp-aside-width', '0px');
        if ("0" === footer) setShowDocFooter(false);
        return ()=>{
            document.documentElement.style.setProperty('--rp-sidebar-width', originalSidebarWidth);
            document.documentElement.style.setProperty('--rp-aside-width', originalAsideWidth);
            setShowNavbar(originNavbar);
            setShowDocFooter(originDocFooter);
        };
    }, [
        location1.search
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if ((0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.inBrowser)() && history.scrollRestoration) history.scrollRestoration = location1.hash.length ? 'manual' : 'auto';
    }, [
        !location1.hash.length
    ]);
    return {
        showAside,
        showNavbar,
        showSidebar,
        showDocFooter
    };
}
const concatTitle = (title, suffix)=>{
    if (!suffix) return title;
    title = title.trim();
    suffix = suffix.trim();
    if (!suffix.startsWith('-') && !suffix.startsWith('|')) return `${title} - ${suffix}`;
    return `${title} ${suffix}`;
};
const Layout = (props)=>{
    const { top, bottom, beforeDocFooter, afterDocFooter, beforeDoc, afterDoc, beforeDocContent, afterDocContent, beforeSidebar, afterSidebar, beforeOutline, afterOutline, beforeNavTitle, afterNavTitle, navTitle, beforeNav, beforeHero, afterHero, beforeFeatures, afterFeatures, afterNavMenu, components } = props;
    const docProps = {
        beforeDocFooter,
        afterDocFooter,
        beforeDocContent,
        afterDocContent,
        beforeDoc,
        afterDoc,
        beforeSidebar,
        afterSidebar,
        beforeOutline,
        afterOutline,
        components
    };
    const homeProps = {
        beforeHero,
        afterHero,
        beforeFeatures,
        afterFeatures
    };
    const { siteData, page } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { pageType, lang: currentLang, title: articleTitle, frontmatter = {} } = page;
    const localesData = useLocaleSiteData();
    useRedirect4FirstVisit();
    let title = frontmatter.title ?? articleTitle;
    const mainTitle = siteData.title || localesData.title || '';
    title = title && 'doc' === pageType ? concatTitle(title, frontmatter.titleSuffix || mainTitle) : 'home' === pageType ? concatTitle(mainTitle, frontmatter.titleSuffix) : '404' === pageType ? concatTitle('404', mainTitle) : mainTitle;
    const description = frontmatter?.description || siteData.description || localesData.description;
    const uiSwitch = {
        ...useUISwitch(),
        ...props.uiSwitch
    };
    const getContentLayout = ()=>{
        switch(pageType){
            case 'home':
                return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__["default"].HomeLayout, {
                    ...homeProps
                });
            case 'doc':
                return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(DocLayout, {
                    ...docProps,
                    uiSwitch: uiSwitch,
                    navTitle: navTitle
                });
            case '404':
                return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__["default"].NotFoundLayout, {});
            case 'custom':
            case 'blank':
                return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.Content, {});
            default:
                return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(DocLayout, {
                    ...docProps
                });
        }
    };
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react_helmet_async_048d06c6__.Helmet, {
                htmlAttributes: {
                    lang: currentLang || 'en'
                },
                children: [
                    title ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("title", {
                        children: title
                    }) : null,
                    description ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("meta", {
                        name: "description",
                        content: description
                    }) : null
                ]
            }),
            top,
            'blank' !== pageType && uiSwitch.showNavbar && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Nav, {
                beforeNavTitle: beforeNavTitle,
                afterNavTitle: afterNavTitle,
                navTitle: navTitle,
                beforeNav: beforeNav,
                afterNavMenu: afterNavMenu
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("section", {
                children: getContentLayout()
            }),
            bottom
        ]
    });
};
function NotFoundLayout() {
    const { siteData, page } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const defaultLang = siteData.lang;
    const defaultVersion = siteData.multiVersion.default;
    if (defaultLang && 'undefined' != typeof window && location.pathname.includes(`/${defaultLang}/`)) {
        const redirectUrl = location.pathname.replace(`/${defaultLang}/`, '/');
        window.location.replace(redirectUrl);
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {});
    }
    let root = '/';
    if (defaultVersion && page.version !== defaultVersion) root += `${page.version}/`;
    if (defaultLang && page.lang !== defaultLang) root += `${page.lang}/`;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "m-auto mt-50 p-16 sm:p-8 sm:pt-24 sm:pb-40 text-center flex-center flex-col",
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("p", {
                className: "text-6xl font-semibold",
                children: "404"
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h1", {
                className: "leading-5 pt-3 text-xl font-bold",
                children: "PAGE NOT FOUND"
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                style: {
                    height: '1px'
                },
                className: "mt-6 mx-auto mb-4.5 w-16 bg-gray-light-1"
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "pt-5",
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("a", {
                    className: "py-2 px-4 rounded-2xl inline-block border-solid border-brand text-brand font-medium hover:border-brand-dark hover:text-brand-dark transition-colors duration-300",
                    href: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(root),
                    "aria-label": "go to home",
                    children: "Take me home"
                })
            })
        ]
    });
}
const code_index_module = {
    "code-button-group": "code-button-group_fb445",
    codeButtonGroup: "code-button-group_fb445",
    "code-copy-button": "code-copy-button_c5089",
    codeCopyButton: "code-copy-button_c5089",
    "icon-success": "icon-success_d5ec0",
    iconSuccess: "icon-success_d5ec0",
    "code-copied": "code-copied_e2224",
    codeCopied: "code-copied_e2224",
    "icon-copy": "icon-copy_ef942",
    iconCopy: "icon-copy_ef942",
    "icon-wrapped": "icon-wrapped_fb89b",
    iconWrapped: "icon-wrapped_fb89b",
    "wrapped-btn": "wrapped-btn_a2562",
    wrappedBtn: "wrapped-btn_a2562",
    "icon-wrap": "icon-wrap_ccd3d",
    iconWrap: "icon-wrap_ccd3d"
};
const timeoutIdMap = new Map();
function copyCode(codeBlockElement, copyButtonElement) {
    let text = '';
    if (!codeBlockElement) return;
    const walk = document.createTreeWalker(codeBlockElement, NodeFilter.SHOW_TEXT, null);
    let node = walk.nextNode();
    while(node){
        if (!node.parentElement.classList.contains('linenumber')) text += node.nodeValue;
        node = walk.nextNode();
    }
    const isCopied = (0, __WEBPACK_EXTERNAL_MODULE_copy_to_clipboard_b679b6a5__["default"])(text);
    if (isCopied && copyButtonElement) {
        copyButtonElement.classList.add(code_index_module.codeCopied);
        clearTimeout(timeoutIdMap.get(copyButtonElement));
        const timeoutId = setTimeout(()=>{
            copyButtonElement.classList.remove(code_index_module.codeCopied);
            copyButtonElement.blur();
            timeoutIdMap.delete(copyButtonElement);
        }, 2000);
        timeoutIdMap.set(copyButtonElement, timeoutId);
    }
}
function CopyCodeButton({ codeBlockRef }) {
    const copyButtonRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("button", {
        className: code_index_module.codeCopyButton,
        onClick: ()=>copyCode(codeBlockRef.current, copyButtonRef.current),
        ref: copyButtonRef,
        title: "Copy code",
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_copy_ebc8477b__["default"],
                className: code_index_module.iconCopy
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_success_55638e57__["default"],
                className: code_index_module.iconSuccess
            })
        ]
    });
}
const prism_theme = {
    doctype: {
        color: 'var(--code-token-text)',
        fontStyle: 'italic'
    },
    token: {
        color: 'var(--code-token-text)'
    },
    comment: {
        color: 'var(--code-token-comment)'
    },
    punctuation: {
        color: 'var(--code-token-punctuation)'
    },
    property: {
        color: 'var(--code-token-parameter)'
    },
    constant: {
        color: 'var(--code-token-constant)'
    },
    string: {
        color: 'var(--code-token-string)'
    },
    symbol: {
        color: 'var(--code-token-symbol)'
    },
    variable: {
        color: 'var(--code-token-variable)'
    },
    'attr-name': {
        color: 'var(--code-token-symbol)'
    },
    'attr-value': {
        color: 'var(--code-token-string-expression)'
    },
    builtin: {
        color: 'var(--code-token-symbol)'
    },
    function: {
        color: 'var(--code-token-function)'
    },
    keyword: {
        color: 'var(--code-token-keyword)'
    },
    tag: {
        color: 'var(--code-token-function)'
    },
    inserted: {
        color: 'var(--code-token-inserted)'
    },
    deleted: {
        color: 'var(--code-token-deleted)'
    },
    regex: {
        color: 'var(--code-token-keyword)'
    },
    key: {
        color: 'var(--code-token-variable)'
    },
    title: {
        color: 'var(--code-token-keyword)'
    },
    important: {
        color: '#EBCB8B',
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: 'bold'
    },
    italic: {
        fontStyle: 'italic'
    },
    table: {
        display: 'content'
    }
};
let registered = false;
function registerLanguages() {
    Object.keys(__WEBPACK_EXTERNAL_MODULE_virtual_prism_languages_a6edd1ed__.languages).forEach((name)=>{
        __WEBPACK_EXTERNAL_MODULE_react_syntax_highlighter_bbd3b718__.PrismLight.registerLanguage(name, __WEBPACK_EXTERNAL_MODULE_virtual_prism_languages_a6edd1ed__.languages[name]);
    });
    __WEBPACK_EXTERNAL_MODULE_react_syntax_highlighter_bbd3b718__.PrismLight.alias(__WEBPACK_EXTERNAL_MODULE_virtual_prism_languages_a6edd1ed__.aliases);
    registered = true;
}
function PrismSyntaxHighlighter(props) {
    const { siteData } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { meta, language, codeWrap } = props;
    const { showLineNumbers } = siteData.markdown;
    let highlightMeta = '';
    let highlightLines = [];
    if (meta) {
        const highlightReg = /{[\d,-]*}/i;
        highlightMeta = highlightReg.exec(meta)?.[0] || '';
        if (highlightMeta) highlightLines = highlightMeta.replace(/[{}]/g, '').split(',').map((item)=>{
            const [start, end] = item.split('-');
            if (end) return Array.from({
                length: Number(end) - Number(start) + 1
            }, (_, i)=>i + Number(start));
            return Number(start);
        }).flat();
    }
    if (!registered) registerLanguages();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE_react_syntax_highlighter_bbd3b718__.PrismLight, {
        language: language,
        style: prism_theme,
        wrapLines: true,
        className: "code",
        wrapLongLines: codeWrap,
        customStyle: {
            backgroundColor: 'inherit'
        },
        showLineNumbers: showLineNumbers || highlightLines.length > 0,
        lineProps: (lineNumber)=>{
            const isHighlighted = highlightLines.includes(lineNumber);
            return {
                style: {
                    ...isHighlighted ? {
                        backgroundColor: 'var(--rp-code-line-highlight-color)'
                    } : {},
                    display: 'block',
                    padding: '0 1.25rem'
                }
            };
        },
        children: String(props.children).trim()
    });
}
function Code(props) {
    const { siteData } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const codeHighlighter = props.codeHighlighter ?? siteData.markdown.codeHighlighter;
    const { defaultWrapCode } = siteData.markdown;
    const [codeWrap, setCodeWrap] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(defaultWrapCode);
    const wrapButtonRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const codeBlockRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const { className } = props;
    const language = className?.replace(/language-/, '');
    if (!language) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("code", {
        ...props
    });
    const toggleCodeWrap = (wrapButtonElement)=>{
        if (codeWrap) wrapButtonElement?.classList.remove(code_index_module.wrappedBtn);
        else wrapButtonElement?.classList.add(code_index_module.wrappedBtn);
        setCodeWrap(!codeWrap);
    };
    const getHighlighter = ()=>{
        switch(codeHighlighter){
            case 'prism':
                return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(PrismSyntaxHighlighter, {
                    ...props,
                    language: language,
                    codeWrap: codeWrap
                });
            case 'shiki':
            default:
                return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("pre", {
                    ...props,
                    style: {
                        overflowX: 'auto'
                    },
                    children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("code", {
                        style: {
                            whiteSpace: codeWrap ? 'pre-wrap' : 'pre'
                        },
                        children: props.children
                    })
                });
        }
    };
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                ref: codeBlockRef,
                children: getHighlighter()
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: code_index_module.codeButtonGroup,
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("button", {
                        ref: wrapButtonRef,
                        className: code_index_module.codeWrapButton,
                        onClick: ()=>toggleCodeWrap(wrapButtonRef.current),
                        title: "Toggle code wrap",
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                                icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_wrapped_01fc4d47__["default"],
                                className: code_index_module.iconWrapped
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                                icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_wrap_367cf3a3__["default"],
                                className: code_index_module.iconWrap
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(CopyCodeButton, {
                        codeBlockRef: codeBlockRef
                    })
                ]
            })
        ]
    });
}
const Hr = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("hr", {
        ...props,
        className: "my-12 border-t border-solid border-divider-light"
    });
const Img = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
        ...props,
        src: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeImagePath)(props.src || '')
    });
const Ol = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("ol", {
        ...props,
        className: "list-decimal pl-5 my-4 leading-7"
    });
const Ul = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("ul", {
        ...props,
        className: "list-disc pl-5 my-4 leading-7"
    });
const Li = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("li", {
        ...props,
        className: "[&:not(:first-child)]:mt-2"
    });
const P = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("p", {
        ...props,
        className: "my-4 leading-7"
    });
const Blockquote = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("blockquote", {
        ...props,
        className: `border-l-2 border-solid border-divider pl-4 my-6 transition-colors duration-500 ${docComponents_index_module.blockquote}`
    });
const Strong = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("strong", {
        ...props,
        className: "font-semibold"
    });
const DEFAULT_LANGUAGE_CLASS = 'language-bash';
function parseTitleFromMeta(meta) {
    if (!meta) return '';
    let result = meta;
    const highlightReg = /{[\d,-]*}/i;
    const highlightMeta = highlightReg.exec(meta)?.[0];
    if (highlightMeta) result = meta.replace(highlightReg, '').trim();
    result = result.split('=')[1] ?? '';
    return result?.replace(/["'`]/g, '');
}
function Pre({ children }) {
    const renderChildren = (children)=>{
        const { className, meta } = children.props;
        const codeTitle = parseTitleFromMeta(meta);
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
            className: className || DEFAULT_LANGUAGE_CLASS,
            children: [
                codeTitle && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: "rspress-code-title",
                    children: codeTitle
                }),
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: "rspress-code-content rspress-scrollbar",
                    children: children
                })
            ]
        });
    };
    if (Array.isArray(children)) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        children: children.map((child)=>renderChildren(child))
    });
    return renderChildren(children);
}
const Table = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("table", {
        ...props,
        className: "block border-collapse text-base my-5 overflow-x-auto leading-7 border-gray-light-3 dark:border-divider"
    });
const Tr = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("tr", {
        ...props,
        className: "border border-solid transition-colors duration-500 even:bg-soft border-gray-light-3 dark:border-divider"
    });
const Td = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("td", {
        ...props,
        className: "border border-solid px-4 py-2 border-gray-light-3 dark:border-divider"
    });
const Th = (props)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("th", {
        ...props,
        className: "border border-solid px-4 py-2 text-text-1 text-base font-semibold border-gray-light-3 dark:border-divider"
    });
function getCustomMDXComponent() {
    return {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        ul: Ul,
        ol: Ol,
        li: Li,
        table: Table,
        td: Td,
        th: Th,
        tr: Tr,
        hr: Hr,
        p: P,
        blockquote: Blockquote,
        strong: Strong,
        a: A,
        code: Code,
        pre: Pre,
        img: Img
    };
}
function useEditLink() {
    const { siteData, page } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const locales = useLocaleSiteData();
    const editLink = locales.editLink ?? siteData.themeConfig?.editLink ?? {};
    if (!editLink.docRepoBaseUrl || !editLink.text) return null;
    let { docRepoBaseUrl } = editLink;
    if (!docRepoBaseUrl.endsWith('/')) docRepoBaseUrl += '/';
    const relativePagePath = page._relativePath.replace(/\\/g, '/');
    const link = `${docRepoBaseUrl}${relativePagePath}`;
    return {
        text: editLink.text,
        link
    };
}
const LOCAL_INDEX = 'default';
const kRegex = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/u;
const cyrillicRegex = /[\u0400-\u04FF]/u;
function backTrackHeaders(rawHeaders, index) {
    let current = rawHeaders[index];
    let currentIndex = index;
    const res = [
        current
    ];
    while(current && current.depth > 2){
        let matchedParent = false;
        for(let i = currentIndex - 1; i >= 0; i--){
            const header = rawHeaders[i];
            if (header.depth > 1 && header.depth === current.depth - 1) {
                current = header;
                currentIndex = i;
                res.unshift(current);
                matchedParent = true;
                break;
            }
        }
        if (!matchedParent) break;
    }
    return res;
}
function normalizeTextCase(text) {
    const textNormalized = text.toString().toLowerCase().normalize('NFD');
    const resultWithAccents = textNormalized;
    const resultWithoutAccents = textNormalized.replace(/[\u0300-\u036f]/g, '');
    if (cyrillicRegex.test(String(text))) return resultWithAccents.normalize('NFC');
    if (kRegex.test(String(text))) return resultWithoutAccents.normalize('NFC');
    return resultWithoutAccents;
}
function removeDomain(url) {
    return url.replace(/https?:\/\/[^/]+/, '');
}
function getCharByteCount(char) {
    const charCode = char.charCodeAt(0);
    if (charCode > 255) return 3;
    return 1;
}
const normalizeSearchIndexes = (items)=>items.map((item)=>'string' == typeof item ? {
            value: item,
            label: item
        } : item);
function substrByBytes(str, start, len) {
    let resultStr = '';
    let bytesCount = 0;
    const strLength = str.length;
    for(let i = 0; i < strLength; i++){
        bytesCount += getCharByteCount(str.charAt(i));
        if (bytesCount > start + len) break;
        if (bytesCount > start) resultStr += str.charAt(i);
    }
    return resultStr;
}
function byteToCharIndex(str, byteIndex) {
    let charIndex = 0;
    let byteCount = 0;
    for(let i = 0; i < str.length; i++){
        if (byteCount >= byteIndex) break;
        byteCount += getCharByteCount(str.charAt(i));
        charIndex++;
    }
    return charIndex;
}
function getSlicedStrByByteLength(str, start, length) {
    const slicedStr = str.slice(start);
    return substrByBytes(slicedStr, 0, length);
}
function getStrByteLength(str) {
    let byteLength = 0;
    for(let i = 0; i < str.length; i++)byteLength += getCharByteCount(str.charAt(i));
    return byteLength;
}
const cjkRegex = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]|[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|[\u3041-\u3096]|[\u30A1-\u30FA]/giu;
const LocalProvider_cyrillicRegex = /[\u0400-\u04FF]/g;
function tokenize(str, regex) {
    const words = [];
    let m = null;
    do {
        m = regex.exec(str);
        if (m) words.push(m[0]);
    }while (m);
    return words;
}
class LocalProvider {
    #index;
    #cjkIndex;
    #cyrillicIndex;
    async #getPages(lang, version) {
        const searchIndexGroupID = `${version}###${lang}`;
        const searchIndexVersion = version ? `.${version.replace('.', '_')}` : '';
        const searchIndexLang = lang ? `.${lang}` : '';
        const result = await fetch(`${(0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.removeTrailingSlash)(__webpack_public_path__)}/static/${__WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.SEARCH_INDEX_NAME}${searchIndexVersion}${searchIndexLang}.${__WEBPACK_EXTERNAL_MODULE_virtual_search_index_hash_00b0989e__["default"][searchIndexGroupID]}.json`);
        return result.json();
    }
    async init(options) {
        const { currentLang, currentVersion } = options;
        const versioned = 'remote' !== options.mode && options.versioned;
        const pagesForSearch = (await this.#getPages(currentLang, versioned ? currentVersion : '')).map((page)=>({
                ...page,
                normalizedContent: normalizeTextCase(page.content),
                headers: page.toc.map((header)=>normalizeTextCase(header.text)).join(' '),
                normalizedTitle: normalizeTextCase(page.title)
            }));
        const createOptions = {
            tokenize: 'full',
            document: {
                id: 'id',
                store: true,
                index: [
                    'normalizedTitle',
                    'headers',
                    'normalizedContent'
                ]
            },
            cache: 100
        };
        this.#index = new __WEBPACK_EXTERNAL_MODULE_flexsearch_dist_module_document_909c0944__["default"](createOptions);
        this.#cjkIndex = new __WEBPACK_EXTERNAL_MODULE_flexsearch_dist_module_document_909c0944__["default"]({
            ...createOptions,
            tokenize: (str)=>tokenize(str, cjkRegex)
        });
        this.#cyrillicIndex = new __WEBPACK_EXTERNAL_MODULE_flexsearch_dist_module_document_909c0944__["default"]({
            ...createOptions,
            tokenize: (str)=>tokenize(str, LocalProvider_cyrillicRegex)
        });
        for (const item of pagesForSearch){
            this.#index.add(item);
            this.#cjkIndex.add(item);
            this.#cyrillicIndex.add(item);
        }
    }
    async search(query) {
        const { keyword, limit } = query;
        const options = {
            enrich: true,
            limit,
            index: [
                'normalizedTitle',
                'headers',
                'normalizedContent'
            ]
        };
        const searchResult = await Promise.all([
            this.#index?.search(keyword, limit, options),
            this.#cjkIndex?.search(keyword, limit, options),
            this.#cyrillicIndex?.search(keyword, limit, options)
        ]);
        const combinedSearchResult = [];
        const pushedId = new Set();
        function insertCombinedSearchResult(resultFromOneSearchIndex) {
            for (const item of resultFromOneSearchIndex)item.result.forEach((resultItem)=>{
                const id = resultItem.id;
                if (pushedId.has(id)) return;
                pushedId.add(id);
                combinedSearchResult.push(resultItem.doc);
            });
        }
        searchResult.forEach((searchResultItem)=>{
            searchResultItem && insertCombinedSearchResult(searchResultItem);
        });
        return [
            {
                index: LOCAL_INDEX,
                hits: combinedSearchResult
            }
        ];
    }
}
function buildQueryString(params) {
    return Object.entries(params).map((pair)=>pair.map(encodeURIComponent).join('=')).join('&');
}
class RemoteProvider {
    #options;
    async init(options) {
        this.#options = options;
    }
    async search(query) {
        const { apiUrl, searchIndexes } = this.#options;
        const { keyword, limit } = query;
        const urlParams = buildQueryString({
            keyword,
            limit: limit.toString(),
            searchIndexes: searchIndexes?.map((indexInfo)=>'string' == typeof indexInfo ? indexInfo : indexInfo.value).join(',') || '',
            lang: this.#options?.currentLang ?? ''
        });
        try {
            const result = await fetch(`${apiUrl}?${urlParams}`);
            return result.json();
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}
var types_RenderType = /*#__PURE__*/ function(RenderType) {
    RenderType["Default"] = "default";
    RenderType["Custom"] = "custom";
    return RenderType;
}({});
const THRESHOLD_CONTENT_LENGTH = 100;
class PageSearcher {
    #options;
    #indexName;
    #provider;
    constructor(options){
        this.#indexName = LOCAL_INDEX;
        this.#options = options;
        this.#indexName = options.indexName ?? LOCAL_INDEX;
        switch(options.mode){
            case 'remote':
                this.#provider = new RemoteProvider();
                break;
            default:
                this.#provider = new LocalProvider();
                break;
        }
    }
    async init() {
        await this.#provider?.init(this.#options);
    }
    async match(keyword, limit = 7) {
        const searchResult = await this.#provider?.search({
            keyword,
            limit
        });
        const normalizedKeyWord = normalizeTextCase(keyword);
        const currentIndexInfo = searchResult?.find((res)=>this.#isCurrentIndex(res.index)) || {
            index: LOCAL_INDEX,
            renderType: types_RenderType.Default,
            hits: []
        };
        const matchResult = [
            {
                group: this.#indexName,
                renderType: types_RenderType.Default,
                result: this.#matchResultItem(normalizedKeyWord, currentIndexInfo)
            },
            ...(searchResult?.filter((res)=>!this.#isCurrentIndex(res.index)) || []).map((res)=>({
                    group: res.index,
                    renderType: types_RenderType.Default,
                    result: this.#matchResultItem(normalizedKeyWord, res)
                }))
        ];
        return matchResult;
    }
    #matchResultItem(normalizedKeyWord, resultItem) {
        const matchedResult = [];
        resultItem?.hits.forEach((item)=>{
            this.#matchTitle(item, normalizedKeyWord, matchedResult);
            const matchHeaderSet = this.#matchHeader(item, normalizedKeyWord, matchedResult);
            this.#matchContent(item, normalizedKeyWord, matchedResult, matchHeaderSet);
        });
        return matchedResult;
    }
    #matchTitle(item, query, matchedResult) {
        const { title = '' } = item;
        const normalizedTitle = normalizeTextCase(title);
        if (normalizedTitle.includes(query)) {
            matchedResult.push({
                type: 'title',
                title,
                header: title,
                link: `${item.domain}${(0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(item.routePath)}`,
                query,
                highlightInfoList: [
                    {
                        start: normalizedTitle.indexOf(query),
                        length: getStrByteLength(query)
                    }
                ],
                group: this.#options.extractGroupName(item.routePath)
            });
            return true;
        }
        return false;
    }
    #matchHeader(item, query, matchedResult) {
        const matchHeaderSet = new WeakSet();
        const { toc = [], domain = '', title = '' } = item;
        for (const [index, header] of toc.entries()){
            const normalizedHeader = normalizeTextCase(header.text);
            if (normalizedHeader.includes(query)) {
                const headerGroup = backTrackHeaders(toc, index);
                const headerStr = headerGroup.map((item)=>item.text).join(' > ');
                const headerMatchIndex = normalizeTextCase(headerStr).indexOf(query);
                const titlePrefix = `${title} > `;
                matchedResult.push({
                    type: 'header',
                    title: item.title,
                    header: `${titlePrefix}${headerStr}`,
                    highlightInfoList: [
                        {
                            start: headerMatchIndex + titlePrefix.length,
                            length: getStrByteLength(query)
                        }
                    ],
                    link: `${domain}${(0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(item.routePath)}#${header.id}`,
                    query,
                    group: this.#options.extractGroupName(item.routePath)
                });
                matchHeaderSet.add(header);
            }
        }
        return matchHeaderSet;
    }
    #matchContent(item, query, matchedResult, matchHeaderSet) {
        const { content, toc, domain } = item;
        if (!content.length) return;
        const normalizedContent = normalizeTextCase(content);
        let queryIndex = normalizedContent.indexOf(query);
        const headersIndex = toc.map((h)=>h.charIndex);
        const getCurrentHeader = (currentIndex)=>{
            const currentHeaderIndex = headersIndex.findIndex((hIndex, position)=>{
                if (!(position < toc.length - 1)) return hIndex < currentIndex;
                {
                    const next = headersIndex[position + 1];
                    if (hIndex <= currentIndex && next >= currentIndex) return true;
                }
                return false;
            });
            return toc[currentHeaderIndex];
        };
        const isHeaderMatched = (header)=>header && matchHeaderSet?.has(header);
        if (-1 === queryIndex) {
            const highlightItems = item._matchesPosition?.content;
            if (!highlightItems?.length) return;
            const highlightStartIndex = item._matchesPosition.content[0].start;
            const currentHeader = getCurrentHeader(highlightStartIndex);
            if (isHeaderMatched(currentHeader)) return;
            const statementStartIndex = byteToCharIndex(content, highlightStartIndex);
            const statementEndIndex = byteToCharIndex(content, highlightStartIndex + THRESHOLD_CONTENT_LENGTH);
            const statement = content.slice(statementStartIndex, statementEndIndex);
            const highlightInfoList = item._matchesPosition.content.filter((match)=>match.start >= highlightStartIndex && match.start + match.length <= highlightStartIndex + THRESHOLD_CONTENT_LENGTH).map((match)=>{
                const startCharIndex = byteToCharIndex(content, match.start) - statementStartIndex + 3;
                return {
                    start: startCharIndex,
                    length: match.length
                };
            });
            matchedResult.push({
                type: 'content',
                title: item.title,
                header: currentHeader?.text ?? item.title,
                link: `${domain}${(0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(item.routePath)}${currentHeader ? `#${currentHeader.id}` : ''}`,
                query,
                highlightInfoList,
                group: this.#options.extractGroupName(item.routePath),
                statement: `...${statement}...`
            });
            return;
        }
        while(-1 !== queryIndex){
            const currentHeader = getCurrentHeader(queryIndex);
            let statementStartIndex = content.slice(0, queryIndex).lastIndexOf('\n');
            statementStartIndex = -1 === statementStartIndex ? 0 : statementStartIndex;
            const statementEndIndex = content.indexOf('\n\n', queryIndex + query.length);
            let statement = content.slice(statementStartIndex, statementEndIndex);
            if (statement.length > THRESHOLD_CONTENT_LENGTH) statement = this.#normalizeStatement(statement, query);
            const highlightIndex = normalizeTextCase(statement).indexOf(query);
            const highlightInfoList = [
                {
                    start: highlightIndex,
                    length: getStrByteLength(query)
                }
            ];
            if (!isHeaderMatched(currentHeader)) {
                matchedResult.push({
                    type: 'content',
                    title: item.title,
                    header: currentHeader?.text ?? item.title,
                    statement,
                    highlightInfoList,
                    link: `${domain}${(0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(item.routePath)}${currentHeader ? `#${currentHeader.id}` : ''}`,
                    query,
                    group: this.#options.extractGroupName(item.routePath)
                });
                currentHeader && matchHeaderSet?.add(currentHeader);
            }
            queryIndex = normalizedContent.indexOf(query, queryIndex + statement.length - highlightIndex);
        }
    }
    #normalizeStatement(statement, query) {
        const queryIndex = normalizeTextCase(statement).indexOf(normalizeTextCase(query));
        const maxPrefixOrSuffix = Math.floor((THRESHOLD_CONTENT_LENGTH - query.length) / 2);
        let prefix = statement.slice(0, queryIndex);
        if (prefix.length > maxPrefixOrSuffix) prefix = `...${statement.slice(queryIndex - maxPrefixOrSuffix + 3, queryIndex)}`;
        let suffix = statement.slice(queryIndex + query.length);
        if (suffix.length > maxPrefixOrSuffix) suffix = `${statement.slice(queryIndex + query.length, queryIndex + maxPrefixOrSuffix - 3)}...`;
        return prefix + query + suffix;
    }
    #isCurrentIndex(index) {
        return index === this.#indexName || index === LOCAL_INDEX;
    }
}
function useFullTextSearch() {
    const { siteData, page } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const [initialized, setInitialized] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const { sidebar } = useLocaleSiteData();
    const extractGroupName = (link)=>getSidebarData(sidebar, link).group;
    const searchRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        async function init() {
            if (!initialized) {
                const searcher = new PageSearcher({
                    ...siteData.search,
                    mode: 'local',
                    currentLang: page.lang,
                    currentVersion: page.version,
                    extractGroupName
                });
                searchRef.current = searcher;
                await searcher.init();
                setInitialized(true);
            }
        }
        init();
    }, []);
    return {
        initialized,
        search: searchRef.current?.match.bind(searchRef.current)
    };
}
const useHandler = (handler)=>{
    const handlerRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(handler);
    handlerRef.current = handler;
    return (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)((...args)=>handlerRef.current(...args)).current;
};
const useMediaQuery = (query)=>{
    const [matches, setMatches] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(()=>'undefined' != typeof window && window.matchMedia(query).matches);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        const mediaQueryList = window.matchMedia(query);
        const listener = (e)=>setMatches(e.matches);
        mediaQueryList.addEventListener('change', listener);
        return ()=>mediaQueryList.removeEventListener('change', listener);
    }, [
        query
    ]);
    return matches;
};
const useStorageValue = (key, defaultValue)=>{
    const [value, setValueInternal] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(()=>{
        if ('undefined' == typeof window) return defaultValue;
        return localStorage.getItem(key) ?? defaultValue;
    });
    const setValue = (0, __WEBPACK_EXTERNAL_MODULE_react__.useCallback)((value)=>{
        setValueInternal((prev)=>{
            const next = 'function' == typeof value ? value(prev) : value;
            if (null == next) localStorage.removeItem(key);
            else localStorage.setItem(key, next);
            return next;
        });
    }, [
        key
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        const listener = (e)=>{
            if (e.key === key) setValueInternal(localStorage.getItem(key) ?? defaultValue);
        };
        window.addEventListener('storage', listener);
        return ()=>{
            window.removeEventListener('storage', listener);
        };
    }, [
        key,
        defaultValue
    ]);
    return [
        value,
        setValue
    ];
};
const sanitize = (value)=>[
        'light',
        'dark',
        'auto'
    ].includes(value) ? value : 'auto';
const disableDarkMode = false === __WEBPACK_EXTERNAL_MODULE_virtual_site_data_fa42d4c0__["default"].themeConfig.darkMode;
const useThemeState = ()=>{
    const matchesDark = useMediaQuery('(prefers-color-scheme: dark)');
    const [storedTheme, setStoredTheme] = useStorageValue(__WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.APPEARANCE_KEY, 'auto');
    const getPreferredTheme = useHandler(()=>{
        if (disableDarkMode) return 'light';
        const sanitized = sanitize(storedTheme);
        return 'auto' === sanitized ? matchesDark ? 'dark' : 'light' : sanitized;
    });
    const [theme, setThemeInternal] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(()=>{
        if ('undefined' == typeof window) return 'light';
        const defaultTheme = window.RSPRESS_THEME ?? window.MODERN_THEME;
        if (defaultTheme) return 'dark' === defaultTheme ? 'dark' : 'light';
        return getPreferredTheme();
    });
    const setTheme = (0, __WEBPACK_EXTERNAL_MODULE_react__.useCallback)((value, storeValue = value)=>{
        if (disableDarkMode) return;
        setThemeInternal(value);
        setStoredTheme(storeValue);
        setSkipEffect(true);
    }, []);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        document.documentElement.classList.toggle('dark', 'dark' === theme);
        document.documentElement.style.colorScheme = theme;
    }, [
        theme
    ]);
    const [skipEffect, setSkipEffect] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(true);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        setSkipEffect(false);
    }, [
        skipEffect
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if (skipEffect) return;
        setTheme(getPreferredTheme(), sanitize(storedTheme));
    }, [
        storedTheme
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if (skipEffect) return;
        setTheme(matchesDark ? 'dark' : 'light', 'auto');
    }, [
        matchesDark
    ]);
    return [
        theme,
        setTheme
    ];
};
const Badge_index_module = {
    badge: "badge_cbafb",
    tip: "tip_cce85",
    info: "info_e8cd3",
    warning: "warning_b5c28",
    danger: "danger_b0301",
    outline: "outline_faf5e"
};
function Badge({ children, type = 'tip', text, outline = false }) {
    const content = children || text;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
        className: `inline-flex items-center justify-center rounded-full border border-solid ${outline ? 'border-current' : 'border-transparent'} font-semibold align-middle px-2.5 h-6 gap-1 text-xs ${Badge_index_module.badge} ${Badge_index_module[type]} ${outline ? Badge_index_module.outline : ''}`,
        children: content
    });
}
const Button_index_module = {
    button: "button_e8e0d",
    medium: "medium_fe00b",
    big: "big_f7033",
    brand: "brand_dc619",
    alt: "alt_b0249"
};
function Button(props) {
    const { theme = 'brand', size = 'big', href = '/', external = false, className = '' } = props;
    let type = null;
    if ('button' === props.type) type = 'button';
    else if ('a' === props.type) type = external ? 'a' : __WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Link;
    return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react__["default"].createElement(type ?? 'a', {
        className: `${Button_index_module.button} ${Button_index_module[theme]} ${Button_index_module[size]} ${className}`,
        href
    }, props.text);
}
function Card({ content, title, icon, style }) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "border border-gray-400 rounded-lg p-6",
        style: style,
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("p", {
                className: "flex items-center gap-2 mb-4",
                children: [
                    icon && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        children: icon
                    }),
                    title && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                        className: "text-2xl font-bold",
                        children: title
                    })
                ]
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "text-base overflow-auto",
                children: content
            })
        ]
    });
}
const EditLink_index_module = {
    editLink: "editLink_e1cfa"
};
function EditLink() {
    const editLinkObj = useEditLink();
    if (!editLinkObj) return null;
    const { text, link } = editLinkObj;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("a", {
        href: link,
        target: "_blank",
        className: EditLink_index_module.editLink,
        children: text
    });
}
const HomeFeature_index_module = {
    "grid-2": "grid-2_bce10",
    grid2: "grid-2_bce10",
    "grid-4": "grid-4_bd059",
    grid4: "grid-4_bd059",
    "grid-6": "grid-6_ce438",
    grid6: "grid-6_ce438",
    "grid-3": "grid-3_bf296",
    grid3: "grid-3_bf296",
    featureCard: "featureCard_a17b6"
};
const GRID_PREFIX = 'grid-';
const getGridClass = (feature)=>{
    const { span } = feature;
    return `${GRID_PREFIX}${span || 4}`;
};
function HomeFeature({ frontmatter, routePath }) {
    const features = frontmatter?.features;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: "overflow-hidden m-auto flex flex-wrap max-w-6xl",
        children: features?.map((feature)=>{
            const { icon, title, details, link: rawLink } = feature;
            let link = rawLink;
            if (rawLink) link = __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.isExternalUrl(rawLink) ? rawLink : __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime(__WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.withBase(rawLink, routePath));
            return /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx("div", {
                className: `${HomeFeature_index_module[getGridClass(feature)]} rounded hover:var(--rp-c-brand)`,
                children: /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx("div", {
                    className: "h-full p-2",
                    children: /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs("article", {
                        className: `rspress-home-feature-card ${HomeFeature_index_module.featureCard} h-full p-8 rounded-4xl border-transparent`,
                        style: {
                            cursor: link ? 'pointer' : 'auto'
                        },
                        onClick: ()=>{
                            if (link) window.location.href = link;
                        },
                        children: [
                            icon ? /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx("div", {
                                className: "flex-center",
                                children: /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx("div", {
                                    className: "rspress-home-feature-icon w-12 h-12 text-3xl text-center",
                                    children: renderHtmlOrText(icon)
                                })
                            }) : null,
                            /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx("h2", {
                                className: "rspress-home-feature-title font-bold text-center",
                                children: title
                            }),
                            /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx("p", {
                                className: "rspress-home-feature-detail leading-6 pt-2 text-sm text-text-2 font-medium",
                                children: renderHtmlOrText(details)
                            })
                        ]
                    }, title)
                })
            }, title);
        })
    });
}
function HomeFooter() {
    const { siteData } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { message } = siteData.themeConfig.footer || {};
    if (!message) return null;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("footer", {
        className: "absolute bottom-0 mt-12 py-8 px-6 sm:p-8 w-full border-t border-solid border-divider-light",
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: "m-auto w-full text-center",
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "font-medium text-sm text-text-2",
                dangerouslySetInnerHTML: {
                    __html: message
                }
            })
        })
    });
}
const HomeHero_index_module = {
    clip: "clip_aacad",
    mask: "mask_bbaa6"
};
const DEFAULT_HERO = {
    name: 'modern',
    text: 'modern ssg',
    tagline: 'modern ssg',
    actions: [],
    image: void 0
};
function HomeHero({ frontmatter, routePath }) {
    const hero = frontmatter?.hero || DEFAULT_HERO;
    const hasImage = void 0 !== hero.image;
    const textMaxWidth = hasImage ? 'sm:max-w-xl' : 'sm:max-w-4xl';
    const multiHeroText = hero.text ? hero.text.toString().split(/\n/g).filter((text)=>'' !== text) : [];
    const imageSrc = 'string' == typeof hero.image?.src ? {
        light: hero.image.src,
        dark: hero.image.src
    } : hero.image?.src || {
        light: '',
        dark: ''
    };
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "m-auto pt-0 px-6 pb-12 sm:pt-10 sm:px-16 md:pt-16 md:px-16 md:pb-16 relative",
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: HomeHero_index_module.mask,
                style: {
                    left: hasImage ? '75%' : '50%'
                }
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "m-auto flex flex-col md:flex-row max-w-6xl min-h-[50vh] mt-12 sm:mt-0",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                        className: "flex flex-col justify-center items-center text-center max-w-xl sm:max-w-4xl m-auto order-2 md:order-1",
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h1", {
                                className: "font-bold text-3xl pb-2 sm:text-6xl md:text-7xl m-auto sm:m-4 md:m-0 md:pb-3 lg:pb-2 leading-tight z-10",
                                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                                    className: HomeHero_index_module.clip,
                                    style: {
                                        lineHeight: '1.3'
                                    },
                                    children: renderHtmlOrText(hero.name)
                                })
                            }),
                            0 !== multiHeroText.length && multiHeroText.map((heroText)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("p", {
                                    className: `rspress-home-hero-text mx-auto md:m-0 text-3xl sm:text-5xl md:text-6xl sm:pb-2 font-bold z-10 ${textMaxWidth}`,
                                    style: {
                                        lineHeight: '1.2'
                                    },
                                    children: renderHtmlOrText(heroText)
                                }, heroText)),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("p", {
                                className: `rspress-home-hero-tagline whitespace-pre-wrap pt-4 m-auto md:m-0 text-sm sm:tex-xl md:text-[1.5rem] text-text-2 font-medium z-10 ${textMaxWidth}`,
                                children: renderHtmlOrText(hero.tagline)
                            }),
                            hero.actions?.length && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                                className: "grid md:flex md:flex-wrap md:justify-center gap-3 m--1.5 pt-6 sm:pt-8 z-10",
                                children: hero.actions.map((action)=>{
                                    const link = (0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.isExternalUrl)(action.link) ? action.link : (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)((0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.withBase)(action.link, routePath));
                                    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                                        className: "flex flex-shrink-0 p-1",
                                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Button, {
                                            type: "a",
                                            href: link,
                                            text: renderHtmlOrText(action.text),
                                            theme: action.theme,
                                            className: "w-full"
                                        })
                                    }, link);
                                })
                            })
                        ]
                    }),
                    hasImage ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                        className: "rspress-home-hero-image md:flex-center m-auto order-1 md:order-2 sm:flex md:none lg:flex",
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
                                src: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeImagePath)(imageSrc.light),
                                alt: hero.image?.alt,
                                srcSet: normalizeSrcsetAndSizes(hero.image?.srcset),
                                sizes: normalizeSrcsetAndSizes(hero.image?.sizes),
                                width: 375,
                                height: 375,
                                className: "dark:hidden"
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
                                src: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeImagePath)(imageSrc.dark),
                                alt: hero.image?.alt,
                                srcSet: normalizeSrcsetAndSizes(hero.image?.srcset),
                                sizes: normalizeSrcsetAndSizes(hero.image?.sizes),
                                width: 375,
                                height: 375,
                                className: "hidden dark:block"
                            })
                        ]
                    }) : null
                ]
            })
        ]
    });
}
function normalizeSrcsetAndSizes(field) {
    const r = (Array.isArray(field) ? field : [
        field
    ]).filter(Boolean).join(', ');
    return r || void 0;
}
function LastUpdated() {
    const { lastUpdatedText: localesLastUpdatedText = 'Last Updated' } = useLocaleSiteData();
    const { page: { lastUpdatedTime }, siteData } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { themeConfig } = siteData;
    const lastUpdatedText = themeConfig?.lastUpdatedText || localesLastUpdatedText;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: "flex text-sm text-text-2 leading-6 sm:leading-8 font-medium",
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("p", {
            children: [
                lastUpdatedText,
                ": ",
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                    children: lastUpdatedTime
                })
            ]
        })
    });
}
const Link_index_module = {
    link: "link_a7cea"
};
__WEBPACK_EXTERNAL_MODULE_nprogress__["default"].configure({
    showSpinner: false
});
function Link(props) {
    const { href = '/', children, className = '', onNavigate, keepCurrentParams = false, ...rest } = props;
    const isExternal = (0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.isExternalUrl)(href);
    const target = isExternal ? '_blank' : '';
    const rel = isExternal ? 'noopener noreferrer' : void 0;
    const withBaseUrl = isExternal ? href : (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(href));
    const navigate = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useNavigate)();
    const { pathname, search } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const withQueryUrl = keepCurrentParams ? withBaseUrl + search : withBaseUrl;
    const inCurrentPage = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)(pathname, withBaseUrl);
    const handleNavigate = async (e)=>{
        if (0 !== e.button || e.currentTarget.target && '_self' !== e.currentTarget.target || e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) return;
        e.preventDefault();
        const hash = withBaseUrl.split('#')[1];
        if (!isExternal && inCurrentPage && hash) {
            const el = document.getElementById(hash);
            if (el) {
                scrollToTarget(el, true);
                navigate(withQueryUrl, {
                    replace: false
                });
            }
            return;
        }
        if (!process.env.__SSR__ && !inCurrentPage) {
            const matchedRoutes = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.matchRoutes)(__WEBPACK_EXTERNAL_MODULE_virtual_routes_98776429__.routes, (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeRoutePath)(withBaseUrl));
            if (matchedRoutes?.length) {
                const timer = setTimeout(()=>{
                    __WEBPACK_EXTERNAL_MODULE_nprogress__["default"].start();
                }, 200);
                await matchedRoutes[0].route.preload();
                clearTimeout(timer);
                __WEBPACK_EXTERNAL_MODULE_nprogress__["default"].done();
            }
            onNavigate?.();
            navigate(withQueryUrl, {
                replace: false
            });
        }
    };
    if (!isExternal) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("a", {
        ...rest,
        className: `${Link_index_module.link} ${className} cursor-pointer`,
        rel: rel,
        target: target,
        onClick: (event)=>{
            rest.onClick?.(event);
            handleNavigate(event);
        },
        href: withBaseUrl,
        children: children
    });
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("a", {
        ...rest,
        href: withBaseUrl,
        target: target,
        rel: rel,
        className: `${Link_index_module.link} ${className}`,
        children: children
    });
}
const LinkCard_index_module = {
    link: "link_e1101",
    linkCard: "linkCard_f82f1"
};
function LinkCard(props) {
    const { href, title, description, style } = props;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: `relative border border-gray-400 rounded-lg p-6 flex justify-between items-start hover:border-gray-500 transition-all duration-300 ${LinkCard_index_module.linkCard}`,
        style: style,
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("a", {
                        href: href,
                        className: `flex items-center gap-2 mb-4 ${LinkCard_index_module.link}`,
                        children: title && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                            className: "text-2xl font-bold",
                            children: title
                        })
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                        className: "text-base overflow-auto",
                        children: description
                    })
                ]
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_assets_arrow_right_3f3bb17d__["default"], {})
        ]
    });
}
function useNavScreen() {
    const { pathname } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const [isScreenOpen, setIsScreenOpen] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    function openScreen() {
        setIsScreenOpen(true);
        window.addEventListener('resize', closeScreenOnTabletWindow);
    }
    function closeScreen() {
        setIsScreenOpen(false);
        window.removeEventListener('resize', closeScreenOnTabletWindow);
    }
    function toggleScreen() {
        if (isScreenOpen) closeScreen();
        else openScreen();
    }
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        closeScreen();
    }, [
        pathname
    ]);
    function closeScreenOnTabletWindow() {
        window.outerWidth >= 768 && closeScreen();
    }
    return {
        isScreenOpen,
        openScreen,
        closeScreen,
        toggleScreen
    };
}
function useNavData() {
    const { nav } = useLocaleSiteData();
    const version = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useVersion)();
    if (Array.isArray(nav)) return nav;
    const navKey = version.length > 0 ? version : 'default';
    return [
        ...nav[navKey]
    ];
}
const Nav_index_module = {
    hidden: "hidden_f8586",
    container: "container_e4235",
    navContainer: "navContainer_d18b1",
    leftNav: "leftNav_e6722",
    rightNav: "rightNav_a2fea",
    singleItem: "singleItem_c1154",
    activeItem: "activeItem_a28b5",
    navBarTitle: "navBarTitle_c5f07",
    "menu-item": "menu-item_b8238",
    menuItem: "menu-item_b8238",
    mobileNavMenu: "mobileNavMenu_e7045",
    mask: "mask_cea59",
    docPage: "docPage_b27ff"
};
function NavMenuSingleItem(item) {
    const { pathname, base } = item;
    const isActive = new RegExp(item.activeMatch || item.link).test((0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.withoutBase)(pathname, base));
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Link, {
        href: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(item.link),
        onClick: item.onClick,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
            className: `rspress-nav-menu-item ${Nav_index_module.singleItem} ${isActive ? Nav_index_module.activeItem : ''} text-sm font-medium ${item.compact ? 'mx-0.5' : 'mx-1.5'} px-3 py-2 flex items-center`,
            children: [
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Tag, {
                    tag: item.tag
                }),
                item.text,
                item.rightIcon
            ]
        }, item.text)
    });
}
function useTranslationMenuData() {
    const { siteData, page } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const currentVersion = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useVersion)();
    const { pathname, search } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const defaultLang = siteData.lang || '';
    const defaultVersion = siteData.multiVersion.default || '';
    const localeLanguages = Object.values(siteData.locales || siteData.themeConfig.locales || {});
    const cleanUrls = siteData.route?.cleanUrls || false;
    const hasMultiLanguage = localeLanguages.length > 1;
    const { lang: currentLang, pageType } = page;
    const { base } = siteData;
    const translationMenuData = hasMultiLanguage ? {
        text: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
            icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_translator_e1217f67__["default"],
            style: {
                width: '18px',
                height: '18px'
            }
        }),
        items: localeLanguages.map((item)=>({
                text: item?.label,
                link: (0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.replaceLang)(pathname + search, {
                    current: currentLang,
                    target: item.lang,
                    default: defaultLang
                }, {
                    current: currentVersion,
                    default: defaultVersion
                }, base, cleanUrls, '404' === pageType)
            })),
        activeValue: localeLanguages.find((item)=>currentLang === item.lang)?.label
    } : {
        items: []
    };
    return translationMenuData;
}
function useVersionMenuData() {
    const { siteData, page } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const currentVersion = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useVersion)();
    const { pathname } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const cleanUrls = siteData.route?.cleanUrls || false;
    const defaultVersion = siteData.multiVersion.default || '';
    const versions = siteData.multiVersion.versions || [];
    const { base } = siteData;
    const versionsMenuData = {
        items: versions.map((version)=>({
                text: version,
                link: (0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.replaceVersion)(pathname, {
                    current: currentVersion,
                    target: version,
                    default: defaultVersion
                }, base, cleanUrls, '404' === page.pageType)
            })),
        text: currentVersion,
        activeValue: currentVersion
    };
    return versionsMenuData;
}
const SocialLinks_index_module = {
    "social-links-icon": "social-links-icon_a4ad0",
    socialLinksIcon: "social-links-icon_a4ad0",
    "menu-item": "menu-item_e90a6",
    menuItem: "menu-item_e90a6"
};
const LinkContent = (props)=>{
    const { link, popperStyle = {} } = props;
    const { icon, mode = 'link', content } = link;
    let IconComp = /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {});
    if (icon) {
        const iconMap = process.env.RSPRESS_SOCIAL_ICONS;
        const html = 'string' == typeof icon ? iconMap[icon] : icon.svg;
        IconComp = /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            dangerouslySetInnerHTML: {
                __html: html
            }
        });
    }
    const [contentVisible, setContentVisible] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const mouseEnterIcon = ()=>{
        setContentVisible(true);
    };
    const mouseLeavePopper = ()=>{
        setContentVisible(false);
    };
    if ('link' === mode) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("a", {
        href: content,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "social-links",
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: `${SocialLinks_index_module.socialLinksIcon}`,
            children: IconComp
        })
    }, content);
    if ('text' === mode) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: `${SocialLinks_index_module.socialLinksIcon} cursor-pointer relative mx-3`,
        onMouseEnter: mouseEnterIcon,
        onMouseLeave: mouseLeavePopper,
        children: [
            IconComp,
            contentVisible ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                style: {
                    boxShadow: 'var(--rp-shadow-3)',
                    border: '1px solid var(--rp-c-divider-light)',
                    ...popperStyle
                },
                className: "z-[1] p-3 w-50 absolute right-0 bg-white dark:bg-dark",
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: "text-md",
                    children: content
                })
            }) : null
        ]
    });
    if ('img' === mode) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: `${SocialLinks_index_module.socialLinksIcon} cursor-pointer relative`,
        onMouseEnter: mouseEnterIcon,
        onMouseLeave: mouseLeavePopper,
        children: [
            IconComp,
            contentVisible ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "break-all z-[1] p-3 w-[50px] h-[50px] absolute right-0 bg-white dark:bg-dark rounded-xl",
                style: {
                    boxShadow: 'var(--rp-shadow-3)',
                    ...popperStyle
                },
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
                    src: content,
                    alt: "img"
                })
            }) : null
        ]
    });
    if ('dom' === mode) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: `${SocialLinks_index_module.socialLinksIcon} cursor-pointer relative`,
        onMouseEnter: mouseEnterIcon,
        onMouseLeave: mouseLeavePopper,
        children: [
            IconComp,
            contentVisible ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "break-all z-[1] p-3 absolute right-0 bg-white dark:bg-dark rounded-xl",
                style: {
                    boxShadow: 'var(--rp-shadow-3)',
                    ...popperStyle
                },
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    dangerouslySetInnerHTML: {
                        __html: content
                    }
                })
            }) : null
        ]
    });
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {});
};
const HiddenLinks = (props)=>{
    const { links } = props;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        style: {
            boxShadow: 'var(--rp-shadow-3)',
            marginRight: '-2px',
            border: '1px solid var(--rp-c-divider-light)',
            background: 'var(--rp-c-bg)'
        },
        className: "absolute top-8 right-0 z-1 p-3 w-32 rounded-2xl flex flex-wrap gap-4",
        children: links.map((item)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(LinkContent, {
                link: item,
                popperStyle: {
                    top: '1.25rem'
                }
            }, item.content))
    });
};
const ShownLinks = (props)=>{
    const { links, moreIconVisible = false, mouseEnter } = props;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "flex-center h-full gap-x-4 transition-colors duration-300 md:mr-2",
                children: links.map((item, index)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(LinkContent, {
                        link: item,
                        popperStyle: {
                            top: '2.5rem'
                        }
                    }, index))
            }),
            moreIconVisible ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "md:ml-1 p-2",
                onMouseEnter: mouseEnter,
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                    icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_arrow_down_f924fb68__["default"]
                })
            }) : null
        ]
    });
};
const MORE_LENGTH = 5;
const SocialLinks = ({ socialLinks })=>{
    const isMore = socialLinks.length > MORE_LENGTH;
    const shownLinks = socialLinks.slice(0, MORE_LENGTH);
    const hiddenLinks = socialLinks.slice(MORE_LENGTH);
    const [hiddenLinksVisible, setHiddenLinksVisible] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const hide = (0, __WEBPACK_EXTERNAL_MODULE_react__.useCallback)(()=>{
        setHiddenLinksVisible(false);
    }, [
        setHiddenLinksVisible
    ]);
    const show = (0, __WEBPACK_EXTERNAL_MODULE_react__.useCallback)(()=>{
        setHiddenLinksVisible(true);
    }, [
        setHiddenLinksVisible
    ]);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: `social-links ${SocialLinks_index_module.menuItem} flex-center relative`,
        onMouseLeave: hide,
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(ShownLinks, {
                links: shownLinks,
                moreIconVisible: isMore,
                mouseEnter: show
            }),
            hiddenLinksVisible ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(HiddenLinks, {
                links: hiddenLinks
            }) : null
        ]
    });
};
const supportAppearanceTransition = ()=>document?.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const removeClipViewTransition = ()=>{
    const styleDom = document.createElement('style');
    styleDom.innerHTML = `
      .rspress-doc {
        view-transition-name: none !important;
      }
  `;
    document.head.appendChild(styleDom);
    return ()=>{
        document.head.removeChild(styleDom);
    };
};
function SwitchAppearance({ onClick }) {
    const { theme, setTheme = ()=>{} } = (0, __WEBPACK_EXTERNAL_MODULE_react__.useContext)(__WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.ThemeContext);
    const handleClick = (event)=>{
        const supported = supportAppearanceTransition();
        const enabled = __WEBPACK_EXTERNAL_MODULE_virtual_site_data_fa42d4c0__["default"]?.themeConfig?.enableAppearanceAnimation;
        const nextTheme = 'dark' === theme ? 'light' : 'dark';
        const isDark = 'dark' === nextTheme;
        if (supported && enabled) {
            const x = event.clientX;
            const y = event.clientY;
            const endRadius = Math.hypot(Math.max(x, innerWidth - x + 200), Math.max(y, innerHeight - y + 200));
            const dispose = removeClipViewTransition();
            const transition = document.startViewTransition(async ()=>{
                (0, __WEBPACK_EXTERNAL_MODULE_react_dom_7136dc57__.flushSync)(()=>{
                    setTheme(nextTheme);
                    onClick?.();
                });
            });
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];
            transition.ready.then(()=>{
                document.documentElement.animate({
                    clipPath: isDark ? [
                        ...clipPath
                    ].reverse() : clipPath
                }, {
                    duration: 400,
                    easing: 'ease-in',
                    pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
                    id: ''
                }).finished.then(()=>{
                    dispose();
                });
            });
        } else {
            setTheme(nextTheme);
            onClick?.();
        }
    };
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        onClick: handleClick,
        className: "md:mr-2 rspress-nav-appearance",
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
            className: "p-1 border border-solid border-gray-300 text-gray-400  cursor-pointer rounded-md hover:border-gray-600 hover:text-gray-600 dark:hover:border-gray-200 dark:hover:text-gray-200 transition-all duration-300 w-7 h-7",
            children: [
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                    className: "dark:hidden",
                    icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_sun_beb20915__["default"],
                    width: "18",
                    height: "18",
                    fill: "currentColor"
                }),
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                    className: "hidden dark:block",
                    icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_moon_c120f886__["default"],
                    width: "18",
                    height: "18",
                    fill: "currentColor"
                })
            ]
        })
    });
}
const NavScreen_index_module = {
    navScreen: "navScreen_ec30c",
    active: "active_d804e",
    container: "container_c935d",
    navMenu: "navMenu_b887b",
    navMenuItem: "navMenuItem_e7978",
    navAppearance: "navAppearance_bf893",
    socialAndAppearance: "socialAndAppearance_eda28",
    navScreenMenuGroup: "navScreenMenuGroup_e771d",
    open: "open_aaab4",
    button: "button_ea41e",
    buttonSpan: "buttonSpan_f4b8f",
    items: "items_dd149",
    down: "down_f631a"
};
function NavScreenMenuGroup(item) {
    const { activeValue } = item;
    const [isOpen, setIsOpen] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    function ActiveGroupItem({ item }) {
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: "p-1 text-center",
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                className: "text-brand",
                children: item.text
            })
        });
    }
    function NormalGroupItem({ item }) {
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: "py-1 font-medium",
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Link, {
                href: item.link,
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: "flex justify-center",
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                            children: item.text
                        })
                    })
                })
            })
        });
    }
    const renderLinkItem = (item)=>{
        if (activeValue === item.text) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(ActiveGroupItem, {
            item: item
        }, item.link);
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NormalGroupItem, {
            item: item
        }, item.link);
    };
    const renderGroup = (item)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
            children: [
                'link' in item ? renderLinkItem(item) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("p", {
                    className: "font-bold text-gray-400 my-1 not:first:border",
                    children: item.text
                }),
                item.items.map(renderLinkItem)
            ]
        });
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: `${isOpen ? NavScreen_index_module.open : ''} ${NavScreen_index_module.navScreenMenuGroup} relative`,
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("button", {
                className: NavScreen_index_module.button,
                onClick: ()=>{
                    setIsOpen(!isOpen);
                },
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                        className: NavScreen_index_module.buttonSpan,
                        children: item.text
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_assets_down_345b1d5d__["default"], {
                        className: `${isOpen ? NavScreen_index_module.open : ''} ${NavScreen_index_module.down} `
                    })
                ]
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: NavScreen_index_module.items,
                    children: item.items.map((item)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                            children: 'items' in item ? renderGroup(item) : renderLinkItem(item)
                        }, item.text))
                })
            })
        ]
    });
}
const NavScreenTranslations = ()=>{
    const translationMenuData = useTranslationMenuData();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: "flex text-sm font-bold justify-center",
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: "mx-1.5 my-1",
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavScreenMenuGroup, {
                ...translationMenuData
            })
        })
    });
};
const NavScreenVersions = ()=>{
    const versionMenuData = useVersionMenuData();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: `${NavScreen_index_module.navTranslations} flex text-sm font-bold justify-center`,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: "mx-1.5 my-1",
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavScreenMenuGroup, {
                ...versionMenuData
            })
        })
    });
};
function NavScreen(props) {
    const { isScreenOpen, toggleScreen, siteData, pathname } = props;
    const screen = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const localesData = siteData.themeConfig.locales || [];
    const hasMultiLanguage = localesData.length > 1;
    const hasMultiVersion = siteData.multiVersion.versions.length > 1;
    const menuItems = useNavData();
    const hasAppearanceSwitch = false !== siteData.themeConfig.darkMode;
    const socialLinks = siteData?.themeConfig?.socialLinks || [];
    const hasSocialLinks = socialLinks.length > 0;
    const langs = localesData.map((item)=>item.lang || 'zh') || [];
    const { base } = siteData;
    const NavScreenAppearance = ()=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: `mt-2 ${NavScreen_index_module.navAppearance} flex justify-center`,
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.NoSSR, {
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SwitchAppearance, {})
            })
        });
    const NavScreenMenu = ({ menuItems })=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: NavScreen_index_module.navMenu,
            children: menuItems.map((item)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: `${NavScreen_index_module.navMenuItem} w-full`,
                    children: 'link' in item ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavMenuSingleItem, {
                        pathname: pathname,
                        base: base,
                        langs: langs,
                        onClick: toggleScreen,
                        ...item
                    }, item.text) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: "mx-3 last:mr-0",
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavScreenMenuGroup, {
                            ...item,
                            items: 'items' in item ? item.items : item
                        })
                    }, item.text)
                }, item.text))
        });
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        screen.current && isScreenOpen && (0, __WEBPACK_EXTERNAL_MODULE_body_scroll_lock_935fd51e__.disableBodyScroll)(screen.current, {
            reserveScrollBarGap: true
        });
        return ()=>{
            (0, __WEBPACK_EXTERNAL_MODULE_body_scroll_lock_935fd51e__.clearAllBodyScrollLocks)();
        };
    }, [
        isScreenOpen
    ]);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: `${NavScreen_index_module.navScreen} ${isScreenOpen ? NavScreen_index_module.active : ''} rspress-nav-screen`,
        ref: screen,
        id: "navScreen",
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
            className: NavScreen_index_module.container,
            children: [
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavScreenMenu, {
                    menuItems: menuItems
                }),
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                    className: "flex-center flex-col gap-2",
                    children: [
                        hasAppearanceSwitch && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavScreenAppearance, {}),
                        hasMultiLanguage && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavScreenTranslations, {}),
                        hasMultiVersion && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavScreenVersions, {}),
                        hasSocialLinks && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SocialLinks, {
                            socialLinks: socialLinks
                        })
                    ]
                })
            ]
        })
    });
}
const NavHamburger_index_module = {
    navHamburger: "navHamburger_ac64c",
    container: "container_e8b23",
    top: "top_ea042",
    middle: "middle_e52e2",
    bottom: "bottom_f0588",
    active: "active_bc9a1"
};
function NavHamburger(props) {
    const { siteData, pathname } = props;
    const { isScreenOpen, toggleScreen } = useNavScreen();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react__.Fragment, {
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavScreen, {
                isScreenOpen: isScreenOpen,
                toggleScreen: toggleScreen,
                siteData: siteData,
                pathname: pathname
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("button", {
                onClick: toggleScreen,
                "aria-label": "mobile hamburger",
                className: `${isScreenOpen ? NavHamburger_index_module.active : ''} rspress-mobile-hamburger ${NavHamburger_index_module.navHamburger} text-gray-500`,
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                    icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_small_menu_b89c442a__["default"],
                    fill: "currentColor"
                })
            })
        ]
    });
}
const NavBarTitle = ()=>{
    const { siteData } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const localeData = useLocaleSiteData();
    const { logo: rawLogo, logoText } = siteData;
    const title = localeData.title ?? siteData.title;
    const logo = (0, __WEBPACK_EXTERNAL_MODULE_react__.useMemo)(()=>{
        if (!rawLogo) return null;
        if ('string' == typeof rawLogo) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
            src: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeImagePath)(rawLogo),
            alt: "logo",
            id: "logo",
            className: "rspress-logo"
        });
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
            children: [
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
                    src: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeImagePath)(rawLogo.light),
                    alt: "logo",
                    id: "logo",
                    className: "rspress-logo dark:hidden"
                }),
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
                    src: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeImagePath)(rawLogo.dark),
                    alt: "logo",
                    id: "logo",
                    className: "rspress-logo hidden dark:block"
                })
            ]
        });
    }, [
        rawLogo
    ]);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: `${Nav_index_module.navBarTitle}`,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Link, {
            href: localeData.langRoutePrefix,
            className: "flex items-center w-full h-full text-base font-semibold transition-opacity duration-300 hover:opacity-60",
            children: [
                logo && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: "mr-1 min-w-8",
                    children: logo
                }),
                logoText && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                    children: logoText
                }),
                !logo && !logoText && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                    children: title
                })
            ]
        })
    });
};
function NavMenuGroup_ActiveGroupItem({ item }) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "rounded-2xl my-1 flex",
        style: {
            padding: '0.4rem 1.5rem 0.4rem 0.75rem'
        },
        children: [
            item.tag && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Tag, {
                tag: item.tag
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                className: "text-brand",
                children: item.text
            })
        ]
    }, item.link);
}
function NavMenuGroup_NormalGroupItem({ item }) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: "font-medium my-1",
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Link, {
            href: item.link,
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "rounded-2xl hover:bg-mute",
                style: {
                    padding: '0.4rem 1.5rem 0.4rem 0.75rem'
                },
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                    className: "flex",
                    children: [
                        item.tag && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Tag, {
                            tag: item.tag
                        }),
                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                            children: item.text
                        })
                    ]
                })
            })
        })
    }, item.link);
}
function NavMenuGroup(item) {
    const { activeValue, items: groupItems, base = '', link = '', pathname = '' } = item;
    const [isOpen, setIsOpen] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const renderLinkItem = (item)=>{
        const isLinkActive = new RegExp(item.activeMatch || item.link).test((0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.withoutBase)(pathname, base));
        if (activeValue === item.text || !activeValue && isLinkActive) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavMenuGroup_ActiveGroupItem, {
            item: item
        }, item.link);
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavMenuGroup_NormalGroupItem, {
            item: item
        }, item.link);
    };
    const renderGroup = (item)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
            children: [
                'link' in item ? renderLinkItem(item) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("p", {
                    className: "font-bold text-gray-400 my-1 not:first:border",
                    children: item.text
                }),
                item.items.map(renderLinkItem)
            ]
        });
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "relative flex-center h-14",
        onMouseLeave: ()=>setIsOpen(false),
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("button", {
                onMouseEnter: ()=>setIsOpen(true),
                className: "rspress-nav-menu-group-button flex-center items-center font-medium text-sm text-text-1 hover:text-text-2 transition-colors duration-200",
                children: link ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavMenuSingleItem, {
                    ...item,
                    rightIcon: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                        icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_down_345b1d5d__["default"]
                    })
                }) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("span", {
                            className: "text-sm font-medium flex",
                            style: {
                                marginRight: '2px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Tag, {
                                    tag: item.tag
                                }),
                                item.text
                            ]
                        }),
                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                            icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_down_345b1d5d__["default"]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "rspress-nav-menu-group-content absolute mx-0.8 transition-opacity duration-300",
                style: {
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? 'visible' : 'hidden',
                    right: 0,
                    top: '52px'
                },
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: "p-3 pr-2 w-full h-full max-h-100vh whitespace-nowrap",
                    style: {
                        boxShadow: 'var(--rp-shadow-3)',
                        zIndex: 100,
                        border: '1px solid var(--rp-c-divider-light)',
                        borderRadius: 'var(--rp-radius-large)',
                        background: 'var(--rp-c-bg)'
                    },
                    children: groupItems.map((item)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                            children: 'items' in item ? renderGroup(item) : renderLinkItem(item)
                        }, item.text))
                })
            })
        ]
    });
}
function NavTranslations() {
    const translationMenuData = useTranslationMenuData();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: `translation ${Nav_index_module.menuItem} flex text-sm font-bold items-center px-3 py-2`,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavMenuGroup, {
                ...translationMenuData
            })
        })
    });
}
function NavVersions() {
    const versionsMenuData = useVersionMenuData();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: `translation ${Nav_index_module.menuItem} flex text-sm font-bold items-center px-3 py-2`,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavMenuGroup, {
                ...versionsMenuData
            })
        })
    });
}
const DEFAULT_NAV_POSITION = 'right';
function Nav(props) {
    const { beforeNavTitle, afterNavTitle, beforeNav, afterNavMenu, navTitle } = props;
    const { siteData, page } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { base } = siteData;
    const { pathname } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const [isMobile, setIsMobile] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const hiddenNav = useHiddenNav();
    const localeLanguages = Object.values(siteData.locales || siteData.themeConfig.locales || {});
    const hasMultiLanguage = localeLanguages.length > 1;
    const hasMultiVersion = siteData.multiVersion.versions.length > 1;
    const socialLinks = siteData.themeConfig.socialLinks || [];
    const hasSocialLinks = socialLinks.length > 0;
    const langs = localeLanguages.map((item)=>item.lang || '') || [];
    const updateIsMobile = ()=>{
        setIsMobile(isMobileDevice());
    };
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        window.addEventListener('resize', updateIsMobile);
        setIsMobile(isMobileDevice());
        return ()=>{
            window.removeEventListener('resize', updateIsMobile);
        };
    }, []);
    const NavMenu = ({ menuItems })=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: "rspress-nav-menu menu h-14",
            children: menuItems.map((item)=>'items' in item || Array.isArray(item) ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: "mx-3 last:mr-0",
                    children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavMenuGroup, {
                        ...item,
                        base: base,
                        pathname: pathname,
                        langs: langs,
                        items: 'items' in item ? item.items : item
                    })
                }, item.text) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavMenuSingleItem, {
                    pathname: pathname,
                    langs: langs,
                    base: base,
                    compact: menuItems.length > 5,
                    ...item
                }, item.link))
        });
    const menuItems = useNavData();
    const getPosition = (menuItem)=>menuItem.position ?? DEFAULT_NAV_POSITION;
    const leftMenuItems = menuItems.filter((item)=>'left' === getPosition(item));
    const rightMenuItems = menuItems.filter((item)=>'right' === getPosition(item));
    const hasSearch = siteData?.themeConfig?.search !== false;
    const hasAppearanceSwitch = false !== siteData.themeConfig.darkMode;
    const leftNav = ()=>leftMenuItems.length > 0 ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: Nav_index_module.leftNav,
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavMenu, {
                menuItems: leftMenuItems
            })
        }) : null;
    const rightNav = ()=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
            className: Nav_index_module.rightNav,
            children: [
                hasSearch && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: "flex sm:flex-1 items-center sm:pl-4 sm:pr-2",
                    children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Search, {})
                }),
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavMenu, {
                    menuItems: rightMenuItems
                }),
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                    className: "flex-center flex-row",
                    children: [
                        hasMultiLanguage && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavTranslations, {}),
                        hasMultiVersion && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavVersions, {}),
                        hasAppearanceSwitch && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                            className: "mx-2",
                            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SwitchAppearance, {})
                        }),
                        hasSocialLinks && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SocialLinks, {
                            socialLinks: socialLinks
                        })
                    ]
                })
            ]
        });
    const computeNavPosition = ()=>{
        if (!isMobile) return 'sticky';
        if ('never' === siteData.themeConfig.hideNavbar && 'doc' !== page.pageType) return 'sticky';
        return 'relative';
    };
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
        children: [
            beforeNav,
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: `${Nav_index_module.navContainer} rspress-nav px-6 ${hiddenNav && !isMobile ? Nav_index_module.hidden : ''} ${computeNavPosition()}`,
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                    className: `${Nav_index_module.container} flex justify-between items-center h-full`,
                    children: [
                        beforeNavTitle,
                        navTitle || /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavBarTitle, {}),
                        afterNavTitle,
                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                            className: "flex flex-1 justify-end items-center",
                            children: [
                                leftNav(),
                                rightNav(),
                                afterNavMenu,
                                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                                    className: Nav_index_module.mobileNavMenu,
                                    children: [
                                        isMobile && hasSearch && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Search, {}),
                                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavHamburger, {
                                            siteData: siteData,
                                            pathname: pathname
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}
const isSidebarDivider = (item)=>'dividerType' in item;
const isSidebarSingleFile = (item)=>!('items' in item) && 'link' in item;
const isSidebarSectionHeader = (item)=>'sectionHeaderText' in item;
const isSideBarCustomLink = (item)=>'link' in item && (0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.isExternalUrl)(item.link);
const preloadLink = (link)=>{
    const match = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.matchRoutes)(__WEBPACK_EXTERNAL_MODULE_virtual_routes_98776429__.routes, link);
    if (match?.length) {
        const { route } = match[0];
        route.preload();
    }
};
const useActiveMatcher = ()=>{
    const localesData = useLocaleSiteData();
    const langRoutePrefix = (0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.normalizeSlash)(localesData.langRoutePrefix || '');
    const { pathname: rawPathname } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const pathname = decodeURIComponent(rawPathname);
    const removeLangPrefix = (path)=>path.replace(langRoutePrefix, '');
    const activeMatcher = (link)=>utils_isActive((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.removeBase)(removeLangPrefix(pathname)), removeLangPrefix(link), true);
    return activeMatcher;
};
const Overview_index_module = {
    "header-anchor": "header-anchor_d4f17",
    headerAnchor: "header-anchor_d4f17",
    "overview-groups": "overview-groups_ced08",
    overviewGroups: "overview-groups_ced08",
    "overview-group-li": "overview-group-li_e0f17",
    overviewGroupLi: "overview-group-li_e0f17",
    "level-2": "level-2_e4d63",
    level2: "level-2_e4d63",
    "level-3": "level-3_b489a",
    level3: "level-3_b489a",
    "level-4": "level-4_a9543",
    level4: "level-4_a9543",
    "overview-group": "overview-group_f8331",
    overviewGroup: "overview-group_f8331",
    header: "header_ba4f6"
};
function removeIndex(link) {
    if (link.endsWith('/index')) return link.slice(0, -5);
    return link;
}
function findItemByRoutePath(items, routePath) {
    function isRoutePathMatch(item) {
        if (isSidebarDivider(item)) return false;
        const withBaseUrl = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(item.link);
        const removeIndexUrl = removeIndex(withBaseUrl);
        const removeBackSlashedRoutePath = routePath.replace(/\/$/, '');
        return withBaseUrl === routePath || removeIndexUrl === routePath || withBaseUrl === removeBackSlashedRoutePath || removeIndexUrl === removeBackSlashedRoutePath;
    }
    const matchRoutePathItemIndex = items.findIndex((item)=>isRoutePathMatch(item));
    if (-1 === matchRoutePathItemIndex) return items.map((item)=>{
        if (!('items' in item)) return [];
        return findItemByRoutePath(item.items, routePath);
    }).flat();
    const matchRoutePathItem = items[matchRoutePathItemIndex];
    const isArray = (i)=>Array.isArray(i) && i.length >= 1;
    if ('items' in matchRoutePathItem && isArray(matchRoutePathItem.items)) {
        if (matchRoutePathItem.items.every((item)=>!('items' in item))) return [
            matchRoutePathItem
        ];
        return matchRoutePathItem.items.filter((item)=>!isSidebarDivider(item));
    }
    const result = [
        ...items
    ];
    if (!('items' in matchRoutePathItem)) result.splice(matchRoutePathItemIndex, 1);
    const res = result.filter((item)=>!isSidebarDivider(item));
    return res;
}
const normalizeText = (s)=>s.toLowerCase().replace(/-/g, ' ');
const matchesQuery = (text, query)=>normalizeText(text).includes(normalizeText(query));
const SearchInput = ({ query, setQuery, searchRef, filterNameText, filterPlaceholderText })=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "flex items-center justify-start gap-4",
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("label", {
                htmlFor: "api-filter",
                children: filterNameText
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("input", {
                ref: searchRef,
                type: "search",
                placeholder: filterPlaceholderText,
                id: "api-filter",
                value: query,
                onChange: (e)=>setQuery(e.target.value),
                className: "border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 transition-shadow duration-250 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            })
        ]
    });
const GroupRenderer = ({ group, styles })=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "mb-16",
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h2", {
                children: renderInlineMarkdown(group.name)
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: styles.overviewGroups,
                children: group.items.map((item)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                        className: styles.overviewGroup,
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                                className: "flex",
                                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h3", {
                                    style: {
                                        marginBottom: 8
                                    },
                                    children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Link, {
                                        href: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(item.link),
                                        children: renderInlineMarkdown(item.text)
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("ul", {
                                className: "list-none",
                                children: item.headers?.map((header)=>/*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx("li", {
                                        className: `${styles.overviewGroupLi} ${styles[`level${header.depth}`]} first:mt-2`,
                                        children: /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Link, {
                                            href: `${__WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime(item.link)}#${header.id}`,
                                            children: renderInlineMarkdown(header.text)
                                        })
                                    }, header.id))
                            })
                        ]
                    }, item.link))
            })
        ]
    }, group.name);
function Overview(props) {
    const { siteData, page: { routePath, title, frontmatter } } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { content, groups: customGroups, defaultGroupTitle = 'Others' } = props;
    const [query, setQuery] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)('');
    const searchRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        searchRef.current?.focus();
    }, []);
    const subFilter = (link)=>(0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(link).startsWith(routePath.replace(/overview$/, '')) && !(0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(link), routePath);
    const getChildLink = (traverseItem)=>{
        if ('link' in traverseItem && traverseItem.link) return traverseItem.link;
        if ('items' in traverseItem) return getChildLink(traverseItem.items[0]);
        return '';
    };
    const { pages } = siteData;
    const overviewModules = pages.filter((page)=>subFilter(page.routePath));
    let { items: overviewSidebarGroups } = useSidebarData();
    const { overview: { filterNameText = 'Filter', filterPlaceholderText = 'Enter keyword', filterNoResultText = 'No matching API found' } = {} } = useLocaleSiteData();
    if (overviewSidebarGroups[0]?.link !== routePath) overviewSidebarGroups = findItemByRoutePath(overviewSidebarGroups, routePath);
    function normalizeSidebarItem(item, sidebarGroup, frontmatter) {
        if (isSidebarDivider(item)) return false;
        if ((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(item.link) === `${routePath}index` && frontmatter?.overview === true) return false;
        const overviewHeaders = props?.overviewHeaders ?? item.overviewHeaders ?? frontmatter?.overviewHeaders ?? sidebarGroup?.overviewHeaders ?? [
            2
        ];
        const pageModule = overviewModules.find((m)=>(0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isEqualPath)(m.routePath, (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)(item.link || '')));
        const link = getChildLink(item);
        return {
            ...item,
            link,
            headers: pageModule?.toc?.filter((header)=>overviewHeaders.some((depth)=>header.depth === depth)) || []
        };
    }
    const groups = customGroups ?? (0, __WEBPACK_EXTERNAL_MODULE_react__.useMemo)(()=>{
        const group = overviewSidebarGroups.filter((normalizedSidebarGroup)=>{
            const sidebarGroup = normalizedSidebarGroup;
            if (Array.isArray(sidebarGroup?.items)) return sidebarGroup.items.filter((item)=>subFilter(getChildLink(item))).length > 0;
            if (isSidebarSingleFile(sidebarGroup) && subFilter(getChildLink(sidebarGroup))) return true;
            return false;
        }).map((normalizedSidebarGroup)=>{
            const sidebarGroup = normalizedSidebarGroup;
            let items = [];
            if (sidebarGroup?.items) items = sidebarGroup?.items?.map((item)=>normalizeSidebarItem(item, sidebarGroup, frontmatter)).filter(Boolean);
            else if (isSidebarSingleFile(sidebarGroup)) items = [
                normalizeSidebarItem({
                    link: sidebarGroup.link,
                    text: sidebarGroup.text || '',
                    tag: sidebarGroup.tag,
                    _fileKey: sidebarGroup._fileKey,
                    overviewHeaders: sidebarGroup.overviewHeaders
                }, void 0, frontmatter)
            ];
            return {
                name: sidebarGroup.text || '',
                items
            };
        });
        return group;
    }, [
        overviewSidebarGroups,
        routePath,
        frontmatter
    ]);
    const filtered = (0, __WEBPACK_EXTERNAL_MODULE_react__.useMemo)(()=>{
        if (!query) return groups;
        return groups.map((group)=>{
            if (matchesQuery(group.name, query)) return group;
            const matchedItems = group.items.map((item)=>{
                if (matchesQuery(item.text || '', query)) return item;
                const matchedHeaders = item.headers?.filter(({ text })=>matchesQuery(text, query));
                return matchedHeaders?.length ? {
                    ...item,
                    headers: matchedHeaders
                } : null;
            }).filter(Boolean);
            return matchedItems.length ? {
                ...group,
                items: matchedItems
            } : null;
        }).filter(Boolean);
    }, [
        groups,
        query
    ]);
    const overviewTitle = title || 'Overview';
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "overview-index mx-auto px-8",
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h1", {
                        className: "text-3xl leading-10 tracking-tight",
                        children: overviewTitle
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SearchInput, {
                        query: query,
                        setQuery: setQuery,
                        searchRef: searchRef,
                        filterNameText: filterNameText,
                        filterPlaceholderText: filterPlaceholderText
                    })
                ]
            }),
            content,
            filtered.length > 0 ? filtered.map((group)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(GroupRenderer, {
                    group: group,
                    styles: Overview_index_module
                }, group?.name)) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "text-lg text-gray-500 text-center mt-9 pt-9 border-t border-gray-200 dark:border-gray-800",
                children: `${filterNoResultText}: ${query}`
            })
        ]
    });
}
function Bun(props) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("svg", {
        id: "Bun",
        width: "1.2em",
        height: "1.2em",
        viewBox: "0 0 80 70",
        ...props,
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                id: "Shadow",
                d: "M71.09,20.74c-.16-.17-.33-.34-.5-.5s-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5A26.46,26.46,0,0,1,75.5,35.7c0,16.57-16.82,30.05-37.5,30.05-11.58,0-21.94-4.23-28.83-10.86l.5.5.5.5.5.5.5.5.5.5.5.5.5.5C19.55,65.3,30.14,69.75,42,69.75c20.68,0,37.5-13.48,37.5-30C79.5,32.69,76.46,26,71.09,20.74Z"
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("g", {
                id: "Body",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                        id: "Background",
                        d: "M73,35.7c0,15.21-15.67,27.54-35,27.54S3,50.91,3,35.7C3,26.27,9,17.94,18.22,13S33.18,3,38,3s8.94,4.13,19.78,10C67,17.94,73,26.27,73,35.7Z",
                        style: {
                            fill: '#fbf0df'
                        }
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                        id: "Bottom_Shadow",
                        "data-name": "Bottom Shadow",
                        d: "M73,35.7a21.67,21.67,0,0,0-.8-5.78c-2.73,33.3-43.35,34.9-59.32,24.94A40,40,0,0,0,38,63.24C57.3,63.24,73,50.89,73,35.7Z",
                        style: {
                            fill: '#f6dece'
                        }
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                        id: "Light_Shine",
                        "data-name": "Light Shine",
                        d: "M24.53,11.17C29,8.49,34.94,3.46,40.78,3.45A9.29,9.29,0,0,0,38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7c0,.4,0,.8,0,1.19C9.06,15.48,20.07,13.85,24.53,11.17Z",
                        style: {
                            fill: '#fffefc'
                        }
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                        id: "Top",
                        d: "M35.12,5.53A16.41,16.41,0,0,1,29.49,18c-.28.25-.06.73.3.59,3.37-1.31,7.92-5.23,6-13.14C35.71,5,35.12,5.12,35.12,5.53Zm2.27,0A16.24,16.24,0,0,1,39,19c-.12.35.31.65.55.36C41.74,16.56,43.65,11,37.93,5,37.64,4.74,37.19,5.14,37.39,5.49Zm2.76-.17A16.42,16.42,0,0,1,47,17.12a.33.33,0,0,0,.65.11c.92-3.49.4-9.44-7.17-12.53C40.08,4.54,39.82,5.08,40.15,5.32ZM21.69,15.76a16.94,16.94,0,0,0,10.47-9c.18-.36.75-.22.66.18-1.73,8-7.52,9.67-11.12,9.45C21.32,16.4,21.33,15.87,21.69,15.76Z",
                        style: {
                            fill: '#ccbea7',
                            fillRule: 'evenodd'
                        }
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                        id: "Outline",
                        d: "M38,65.75C17.32,65.75.5,52.27.5,35.7c0-10,6.18-19.33,16.53-24.92,3-1.6,5.57-3.21,7.86-4.62,1.26-.78,2.45-1.51,3.6-2.19C32,1.89,35,.5,38,.5s5.62,1.2,8.9,3.14c1,.57,2,1.19,3.07,1.87,2.49,1.54,5.3,3.28,9,5.27C69.32,16.37,75.5,25.69,75.5,35.7,75.5,52.27,58.68,65.75,38,65.75ZM38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7,3,50.89,18.7,63.25,38,63.25S73,50.89,73,35.7C73,26.62,67.31,18.13,57.78,13,54,11,51.05,9.12,48.66,7.64c-1.09-.67-2.09-1.29-3-1.84C42.63,4,40.42,3,38,3Z"
                    })
                ]
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("g", {
                id: "Mouth",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("g", {
                        id: "Background-2",
                        "data-name": "Background",
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                            d: "M45.05,43a8.93,8.93,0,0,1-2.92,4.71,6.81,6.81,0,0,1-4,1.88A6.84,6.84,0,0,1,34,47.71,8.93,8.93,0,0,1,31.12,43a.72.72,0,0,1,.8-.81H44.26A.72.72,0,0,1,45.05,43Z",
                            style: {
                                fill: '#b71422'
                            }
                        })
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("g", {
                        id: "Tongue",
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                                id: "Background-3",
                                "data-name": "Background",
                                d: "M34,47.79a6.91,6.91,0,0,0,4.12,1.9,6.91,6.91,0,0,0,4.11-1.9,10.63,10.63,0,0,0,1-1.07,6.83,6.83,0,0,0-4.9-2.31,6.15,6.15,0,0,0-5,2.78C33.56,47.4,33.76,47.6,34,47.79Z",
                                style: {
                                    fill: '#ff6164'
                                }
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                                id: "Outline-2",
                                "data-name": "Outline",
                                d: "M34.16,47a5.36,5.36,0,0,1,4.19-2.08,6,6,0,0,1,4,1.69c.23-.25.45-.51.66-.77a7,7,0,0,0-4.71-1.93,6.36,6.36,0,0,0-4.89,2.36A9.53,9.53,0,0,0,34.16,47Z"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                        id: "Outline-3",
                        "data-name": "Outline",
                        d: "M38.09,50.19a7.42,7.42,0,0,1-4.45-2,9.52,9.52,0,0,1-3.11-5.05,1.2,1.2,0,0,1,.26-1,1.41,1.41,0,0,1,1.13-.51H44.26a1.44,1.44,0,0,1,1.13.51,1.19,1.19,0,0,1,.25,1h0a9.52,9.52,0,0,1-3.11,5.05A7.42,7.42,0,0,1,38.09,50.19Zm-6.17-7.4c-.16,0-.2.07-.21.09a8.29,8.29,0,0,0,2.73,4.37A6.23,6.23,0,0,0,38.09,49a6.28,6.28,0,0,0,3.65-1.73,8.3,8.3,0,0,0,2.72-4.37.21.21,0,0,0-.2-.09Z"
                    })
                ]
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("g", {
                id: "Face",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("ellipse", {
                        id: "Right_Blush",
                        "data-name": "Right Blush",
                        cx: "53.22",
                        cy: "40.18",
                        rx: "5.85",
                        ry: "3.44",
                        style: {
                            fill: '#febbd0'
                        }
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("ellipse", {
                        id: "Left_Bluch",
                        "data-name": "Left Bluch",
                        cx: "22.95",
                        cy: "40.18",
                        rx: "5.85",
                        ry: "3.44",
                        style: {
                            fill: '#febbd0'
                        }
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                        id: "Eyes",
                        d: "M25.7,38.8a5.51,5.51,0,1,0-5.5-5.51A5.51,5.51,0,0,0,25.7,38.8Zm24.77,0A5.51,5.51,0,1,0,45,33.29,5.5,5.5,0,0,0,50.47,38.8Z",
                        style: {
                            fillRule: 'evenodd'
                        }
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                        id: "Iris",
                        d: "M24,33.64a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,24,33.64Zm24.77,0a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,48.75,33.64Z",
                        style: {
                            fill: '#fff',
                            fillRule: 'evenodd'
                        }
                    })
                ]
            })
        ]
    });
}
function Npm(props) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 256 256",
        ...props,
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                fill: "#C12127",
                d: "M0 256V0h256v256z"
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                fill: "#FFF",
                d: "M48 48h160v160h-32V80h-48v128H48z"
            })
        ]
    });
}
function Pnpm(props) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 128 128",
        ...props,
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                fill: "#f8ab00",
                d: "M0 .004V40h39.996V.004Zm43.996 0V40h40V.004Zm44.008 0V40H128V.004Zm0 43.996v39.996H128V44Z"
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                fill: "#4c4c4c",
                d: "M43.996 44v39.996h40V44ZM0 87.996v40h39.996v-40Zm43.996 0v40h40v-40Zm44.008 0v40H128v-40Z"
            })
        ]
    });
}
function Yarn(props) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 128 128",
        ...props,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("g", {
            fill: "#2c8ebb",
            children: [
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                    d: "M99.24 80.71C94.9 80.76 91.1 83 87.89 85c-6 3.71-9 3.47-9 3.47l-.1-.17c-.41-.67 1.92-6.68-.69-13.84c-2.82-7.83-7.3-9.72-6.94-10.32c1.53-2.59 5.36-6.7 6.89-14.36c.91-4.64.67-12.28-1.39-16.28c-.38-.74-3.78 1.24-3.78 1.24s-3.18-7.09-4.07-7.66c-2.87-1.84-6 7.61-6 7.61a14 14 0 0 0-11.71 4.5a9.64 9.64 0 0 1-3.85 2.27c-.41.14-.91.12-2.15 3.47c-1.9 5.07 3.24 10.81 3.24 10.81s-6.13 4.33-8.4 9.72a24.78 24.78 0 0 0-1.75 11.68s-4.36 3.78-4.64 7.68a12.87 12.87 0 0 0 1.77 7.83a1.94 1.94 0 0 0 2.63.91s-2.9 3.38-.19 4.81c2.47 1.29 6.63 2 8.83-.19c1.6-1.6 1.92-5.17 2.51-6.63c.14-.34.62.57 1.08 1a10 10 0 0 0 1.36 1s-3.9 1.68-2.3 5.51c.53 1.27 2.42 2.08 5.51 2.06c1.15 0 13.76-.72 17.12-1.53a4.33 4.33 0 0 0 2.61-1.46a63 63 0 0 0 15.49-7c4.74-3.09 6.68-3.93 10.51-4.84c3.16-.75 2.95-5.65-1.24-5.58z"
                }),
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                    d: "M64 2a62 62 0 1 0 62 62A62 62 0 0 0 64 2zm37.3 87.83c-3.35.81-4.91 1.44-9.41 4.36a67 67 0 0 1-15.56 7.18a8.71 8.71 0 0 1-3.64 1.77c-3.81.93-16.88 1.63-17.91 1.63h-.24c-4 0-6.27-1.24-7.49-2.54c-3.4 1.7-7.8 1-11-.69a5.55 5.55 0 0 1-3-3.9a6 6 0 0 1 0-2.06a6.66 6.66 0 0 1-.79-1A16.38 16.38 0 0 1 30 84.52c.29-3.73 2.87-7.06 4.55-8.83A28.56 28.56 0 0 1 36.61 64a26.82 26.82 0 0 1 6.82-9c-1.65-2.78-3.33-7.06-1.7-11.42c1.17-3.11 2.13-4.84 4.24-5.58a6.84 6.84 0 0 0 2.51-1.34A17.65 17.65 0 0 1 60.34 31c.19-.48.41-1 .65-1.46c1.6-3.4 3.3-5.31 5.29-6a4.88 4.88 0 0 1 4.4.5c.65.43 1.48 1 3.9 6a4.69 4.69 0 0 1 2.85-.1a3.81 3.81 0 0 1 2.39 1.94c2.47 4.74 2.8 13.19 1.72 18.62a33.8 33.8 0 0 1-5.84 13.31a25.73 25.73 0 0 1 5.77 9.43a25.42 25.42 0 0 1 1.41 10.41A28.7 28.7 0 0 0 86 81.91c3.06-1.89 7.68-4.74 13.19-4.81a6.62 6.62 0 0 1 7 5.7a6.35 6.35 0 0 1-4.89 7.03z"
                })
            ]
        })
    });
}
function normalizeCommand(command) {
    if (command.startsWith('yarn create')) return command.replace(/(yarn create [^\s]+)@latest/, '$1');
    if (!command?.includes('install')) return command;
    const pureCommand = command.split(' ').filter((item)=>!item.startsWith('-') && !item.startsWith('--')).join(' ');
    if ('yarn install' === pureCommand || 'bun install' === pureCommand) return command;
    return command.replace('install', 'add');
}
function PackageManagerTabs({ command, additionalTabs = [] }) {
    let commandInfo;
    const packageMangerToIcon = {
        npm: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Npm, {}),
        yarn: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Yarn, {}),
        pnpm: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Pnpm, {}),
        bun: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Bun, {})
    };
    additionalTabs.forEach((tab)=>{
        packageMangerToIcon[tab.tool] = tab.icon;
    });
    if ('string' == typeof command) {
        commandInfo = {
            npm: `npm ${command}`,
            yarn: `yarn ${command}`,
            pnpm: `pnpm ${command}`,
            bun: `bun ${command}`
        };
        additionalTabs.forEach((tab)=>{
            commandInfo[tab.tool] = `${tab.tool} ${command}`;
        });
    } else commandInfo = command;
    commandInfo.yarn && (commandInfo.yarn = normalizeCommand(commandInfo.yarn));
    commandInfo.bun && (commandInfo.bun = normalizeCommand(commandInfo.bun));
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Tabs, {
        groupId: "package.manager",
        values: Object.entries(commandInfo).map(([key])=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 15
                },
                children: [
                    packageMangerToIcon[key],
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                        style: {
                            marginLeft: 6,
                            marginBottom: 2
                        },
                        children: key
                    })
                ]
            }, key)),
        children: Object.entries(commandInfo).map(([key, value])=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Tab, {
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Pre, {
                    children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Code, {
                        className: "language-js",
                        codeHighlighter: "prism",
                        children: value
                    })
                })
            }, key))
    });
}
const PrevNextPage_index_module = {
    "pager-link": "pager-link_e0d2d",
    pagerLink: "pager-link_e0d2d",
    title: "title_a3acb",
    next: "next_ad355",
    desc: "desc_dcc01"
};
function PrevNextPage(props) {
    const { type, text, href } = props;
    const { prevPageText = 'Previous Page', nextPageText = 'Next Page' } = useLocaleSiteData();
    const pageText = 'prev' === type ? prevPageText : nextPageText;
    const linkClassName = 'prev' === type ? PrevNextPage_index_module.pagerLink : `${PrevNextPage_index_module.pagerLink} ${PrevNextPage_index_module.next}`;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Link, {
        href: href,
        className: linkClassName,
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                className: PrevNextPage_index_module.desc,
                children: pageText
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                className: PrevNextPage_index_module.title,
                children: text
            })
        ]
    });
}
const ScrollToTop_index_module = {
    "scroll-to-top": "scroll-to-top_e22be",
    scrollToTop: "scroll-to-top_e22be",
    entered: "entered_c8faf"
};
function ScrollToTop() {
    const [isVisible, setIsVisible] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const handleScroll = ()=>{
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setIsVisible(scrollTop > 0);
    };
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        window.addEventListener('scroll', handleScroll);
    }, []);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("button", {
        className: `${ScrollToTop_index_module.scrollToTop} ${isVisible ? ScrollToTop_index_module.entered : ''}`,
        onClick: scrollToTop,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "currentColor",
            className: "w-6 h-6",
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("path", {
                fillRule: "evenodd",
                d: "M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z",
                clipRule: "evenodd"
            })
        })
    });
}
const Tabs_index_module = {
    container: "container_df5ed",
    "tab-list": "tab-list_ccbcc",
    tabList: "tab-list_ccbcc",
    tab: "tab_cae68",
    "not-selected": "not-selected_dab7a",
    notSelected: "not-selected_dab7a",
    selected: "selected_f5c1e",
    "no-scrollbar": "no-scrollbar_db61f",
    noScrollbar: "no-scrollbar_db61f"
};
function isTabItem(item) {
    if (item && 'object' == typeof item && 'label' in item) return true;
    return false;
}
const renderTab = (item)=>{
    if (isTabItem(item)) return item.label || item.value;
    return item;
};
const groupIdPrefix = 'rspress.tabs.';
const Tabs = /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react__.forwardRef)((props, ref)=>{
    const { values, defaultValue, onChange, children: rawChildren, groupId, tabPosition = 'left', tabContainerClassName } = props;
    const children = __WEBPACK_EXTERNAL_MODULE_react__.Children.toArray(rawChildren).filter((child)=>!('string' == typeof child && '' === child.trim()));
    let tabValues = values || [];
    if (0 === tabValues.length) tabValues = __WEBPACK_EXTERNAL_MODULE_react__.Children.map(children, (child)=>{
        if (/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react__.isValidElement)(child)) return {
            label: child.props?.label,
            value: child.props?.value || child.props?.label
        };
        return {
            label: void 0,
            value: void 0
        };
    });
    const { tabData, setTabData } = (0, __WEBPACK_EXTERNAL_MODULE_react__.useContext)(TabDataContext);
    const [activeIndex, setActiveIndex] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(()=>{
        if (void 0 === defaultValue) return 0;
        return tabValues.findIndex((item)=>{
            if ('string' == typeof item) return item === defaultValue;
            if (item && 'object' == typeof item && 'value' in item) return item.value === defaultValue;
            return false;
        });
    });
    const [storageIndex, setStorageIndex] = useStorageValue(`${groupIdPrefix}${groupId}`, activeIndex.toString());
    const syncIndex = (0, __WEBPACK_EXTERNAL_MODULE_react__.useMemo)(()=>{
        if (groupId) {
            if (void 0 !== tabData[groupId]) return tabData[groupId];
            return Number.parseInt(storageIndex);
        }
        return activeIndex;
    }, [
        groupId && tabData[groupId]
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if (groupId) {
            const correctIndex = Number.parseInt(storageIndex);
            if (syncIndex !== correctIndex) setTabData({
                ...tabData,
                [groupId]: correctIndex
            });
        }
    }, [
        storageIndex
    ]);
    const currentIndex = groupId ? syncIndex : activeIndex;
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: Tabs_index_module.container,
        ref: ref,
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: tabContainerClassName,
                children: tabValues.length ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: `${Tabs_index_module.tabList} ${Tabs_index_module.noScrollbar}`,
                    style: {
                        justifyContent: 'center' === tabPosition ? 'center' : 'flex-start'
                    },
                    children: tabValues.map((item, index)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                            className: `${Tabs_index_module.tab} ${currentIndex === index ? Tabs_index_module.selected : Tabs_index_module.notSelected}`,
                            onClick: ()=>{
                                onChange?.(index);
                                if (groupId) {
                                    setTabData({
                                        ...tabData,
                                        [groupId]: index
                                    });
                                    setStorageIndex(index.toString());
                                } else setActiveIndex(index);
                            },
                            children: renderTab(item)
                        }, index))
                }) : null
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                children: __WEBPACK_EXTERNAL_MODULE_react__.Children.toArray(children)[currentIndex]
            })
        ]
    });
});
function Tab({ children, ...props }) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        ...props,
        className: "rounded px-2",
        children: children
    });
}
function NoSearchResult({ query }) {
    const { searchNoResultsText = 'No results for', searchSuggestedQueryText = 'Please try again with a different keyword' } = useLocaleSiteData();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "flex flex-col items-center pt-8 pb-2",
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_empty_326d8860__["default"],
                className: "mb-4 opacity-80"
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("p", {
                className: "mb-2",
                children: [
                    searchNoResultsText,
                    " ",
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("b", {
                        children: [
                            '"',
                            query,
                            '"'
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("p", {
                children: searchSuggestedQueryText
            })
        ]
    });
}
const Search_index_module = {
    mask: "mask_ac6b3",
    modal: "modal_e4a04",
    inputForm: "inputForm_d4ba2",
    input: "input_f8add",
    close: "close_bee84",
    searchHits: "searchHits_dc1b2",
    groupTitle: "groupTitle_fe27c",
    navSearchButton: "navSearchButton_df1fb",
    searchWord: "searchWord_af2c1",
    suggestItem: "suggestItem_b1e66",
    suggestItemContainer: "suggestItemContainer_f5e47",
    contentWrapper: "contentWrapper_efb78",
    mark: "mark_b6cd5",
    titleForContent: "titleForContent_f2995",
    actionIcon: "actionIcon_f4ffd",
    current: "current_eb655",
    tabClassName: "tabClassName_b3f85",
    mobileNavSearchButton: "mobileNavSearchButton_d85a9"
};
const ICON_MAP = {
    title: __WEBPACK_EXTERNAL_MODULE__theme_assets_title_56a7311e__["default"],
    header: __WEBPACK_EXTERNAL_MODULE__theme_assets_header_54924fa3__["default"],
    content: __WEBPACK_EXTERNAL_MODULE__theme_assets_file_9182f35f__["default"]
};
function SuggestItem({ suggestion, closeSearch, isCurrent, setCurrentSuggestionIndex, inCurrentDocIndex, scrollTo, onMouseMove }) {
    const HitIcon = ICON_MAP[suggestion.type];
    const link = inCurrentDocIndex && !(0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.isProduction)() ? removeDomain(suggestion.link) : suggestion.link;
    const selfRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    if (isCurrent && selfRef.current?.offsetTop) scrollTo(selfRef.current?.offsetTop, selfRef.current?.offsetHeight);
    const getHighlightedFragments = (rawText, highlights)=>{
        const fragmentList = [];
        let lastIndex = 0;
        for (const highlightInfo of highlights){
            const { start, length } = highlightInfo;
            const prefix = rawText.slice(lastIndex, start);
            const queryStr = getSlicedStrByByteLength(rawText, start, length);
            fragmentList.push(prefix);
            fragmentList.push(/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                className: Search_index_module.mark,
                children: queryStr
            }, start));
            lastIndex = start + queryStr.length;
        }
        if (lastIndex < rawText.length) fragmentList.push(rawText.slice(lastIndex));
        return fragmentList;
    };
    const renderHeaderMatch = ()=>{
        if ('header' === suggestion.type || 'title' === suggestion.type) {
            const { header, highlightInfoList } = suggestion;
            return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "font-medium",
                children: getHighlightedFragments(header, highlightInfoList)
            });
        }
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: "font-medium",
            children: suggestion.header
        });
    };
    const renderStatementMatch = ()=>{
        if ('content' !== suggestion.type) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {});
        const { statement, highlightInfoList } = suggestion;
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: "text-sm text-gray-light w-full",
            children: getHighlightedFragments(statement, highlightInfoList)
        });
    };
    let hitContent = null;
    switch(suggestion.type){
        case 'title':
        case 'header':
            hitContent = renderHeaderMatch();
            break;
        case 'content':
            hitContent = /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
                children: [
                    renderStatementMatch(),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("p", {
                        className: Search_index_module.titleForContent,
                        children: suggestion.title
                    })
                ]
            });
            break;
        default:
            break;
    }
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("li", {
        className: `rspress-search-suggest-item ${Search_index_module.suggestItem} ${isCurrent ? Search_index_module.current : ''}`,
        onMouseEnter: setCurrentSuggestionIndex,
        onMouseMove: onMouseMove,
        ref: selfRef,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("a", {
            href: link,
            onClick: (e)=>{
                closeSearch();
                e.stopPropagation();
            },
            target: inCurrentDocIndex ? '_self' : '_blank',
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: Search_index_module.suggestItemContainer,
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: Search_index_module.hitIcon,
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                            icon: HitIcon
                        })
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: Search_index_module.contentWrapper,
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                            children: hitContent
                        })
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: Search_index_module.actionIcon,
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                            icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_jump_20d3ca88__["default"]
                        })
                    })
                ]
            })
        })
    }, suggestion.link);
}
const KEY_CODE = {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ENTER: 'Enter',
    SEARCH: 'KeyK',
    ESC: 'Escape'
};
const useDebounce = (cb)=>{
    const cbRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(cb);
    cbRef.current = cb;
    const debounced = (0, __WEBPACK_EXTERNAL_MODULE_react__.useCallback)((0, __WEBPACK_EXTERNAL_MODULE_lodash_es_18c59938__.debounce)((...args)=>cbRef.current(...args), 150), []);
    return debounced;
};
function SearchPanel({ focused, setFocused }) {
    const [query, setQuery] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)('');
    const [searchResult, setSearchResult] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)([]);
    const searchInputRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const [initing, setIniting] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(true);
    const [isSearching, setIsSearching] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const [resultTabIndex, setResultTabIndex] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(0);
    const [currentSuggestionIndex, setCurrentSuggestionIndex] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(0);
    const pageSearcherRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const pageSearcherConfigRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const searchResultRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const searchResultTabRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const mousePositionRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)({
        pageX: null,
        pageY: null
    });
    const [canScroll, setCanScroll] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const scrollTo = (offsetTop, offsetHeight)=>{
        const currentOffsetHeight = searchResultRef.current?.offsetHeight;
        const currentScrollTop = searchResultRef.current?.scrollTop;
        if (canScroll && void 0 !== currentOffsetHeight && void 0 !== currentScrollTop) {
            const scrollDown = offsetTop + offsetHeight - currentOffsetHeight - (1 === searchResult.length ? 50 : -10);
            if (scrollDown > currentScrollTop) searchResultRef.current?.scrollTo({
                top: scrollDown
            });
            const scrollUp = 1 === searchResult.length ? offsetTop - 70 : offsetTop - 10;
            if (scrollUp < currentScrollTop) searchResultRef.current?.scrollTo({
                top: scrollUp
            });
        }
    };
    const { siteData, page: { lang, version } } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    const { sidebar, searchPlaceholderText = 'Search Docs' } = useLocaleSiteData();
    const { search, title: siteTitle } = siteData;
    const versionedSearch = search && 'remote' !== search.mode && search.versioned;
    const DEFAULT_RESULT = [
        {
            group: siteTitle,
            result: [],
            renderType: types_RenderType.Default
        }
    ];
    const currentSuggestions = searchResult[resultTabIndex]?.result ?? [];
    const currentRenderType = searchResult[resultTabIndex]?.renderType ?? types_RenderType.Default;
    const extractGroupName = (link)=>getSidebarData(sidebar, link).group;
    async function initPageSearcher() {
        if (false === search) return;
        const pageSearcherConfig = {
            currentLang: lang,
            currentVersion: version,
            extractGroupName
        };
        const pageSearcher = new PageSearcher({
            indexName: siteTitle,
            ...search,
            ...pageSearcherConfig
        });
        pageSearcherRef.current = pageSearcher;
        pageSearcherConfigRef.current = pageSearcherConfig;
        await pageSearcherRef.current.init();
        setIniting(false);
        const query = searchInputRef.current?.value;
        if (query) {
            const matched = await pageSearcherRef.current?.match(query);
            setSearchResult(matched || DEFAULT_RESULT);
            setIsSearching(false);
        }
    }
    const clearSearchState = ()=>{
        setFocused(false);
        setResultTabIndex(0);
        setCurrentSuggestionIndex(0);
    };
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        const onKeyDown = (e)=>{
            switch(e.code){
                case KEY_CODE.SEARCH:
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        setFocused(!focused);
                    }
                    break;
                case KEY_CODE.ARROW_DOWN:
                    if (focused) {
                        e.preventDefault();
                        if (currentSuggestions && currentRenderType === types_RenderType.Default) {
                            setCanScroll(true);
                            setCurrentSuggestionIndex((currentSuggestionIndex + 1) % currentSuggestions.length);
                        }
                    }
                    break;
                case KEY_CODE.ARROW_UP:
                    if (focused) {
                        e.preventDefault();
                        if (currentRenderType === types_RenderType.Default) {
                            const currentSuggestionsLength = currentSuggestions.length;
                            setCanScroll(true);
                            setCurrentSuggestionIndex((currentSuggestionIndex - 1 + currentSuggestionsLength) % currentSuggestionsLength);
                        }
                    }
                    break;
                case KEY_CODE.ENTER:
                    if (currentSuggestionIndex >= 0 && currentRenderType === types_RenderType.Default) {
                        const flatSuggestions = [
                            ...Object.values(normalizeSuggestions(currentSuggestions))
                        ].flat();
                        const suggestion = flatSuggestions[currentSuggestionIndex];
                        const isCurrent = 0 === resultTabIndex;
                        if (isCurrent) window.location.href = (0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.isProduction)() ? suggestion.link : removeDomain(suggestion.link);
                        else window.open(suggestion.link);
                        clearSearchState();
                    }
                    break;
                case KEY_CODE.ESC:
                    clearSearchState();
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return ()=>{
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [
        setCurrentSuggestionIndex,
        setFocused,
        focused,
        resultTabIndex,
        currentSuggestions,
        currentSuggestionIndex
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if (focused) {
            setSearchResult(DEFAULT_RESULT);
            if (!pageSearcherRef.current) initPageSearcher();
        } else setQuery('');
    }, [
        focused
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if ('requestIdleCallback' in window) window.requestIdleCallback(()=>{
            if (!pageSearcherRef.current) initPageSearcher();
        });
    }, []);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        const { currentLang, currentVersion } = pageSearcherConfigRef.current ?? {};
        const isLangChanged = lang !== currentLang;
        const isVersionChanged = versionedSearch && version !== currentVersion;
        if (!initing && (isLangChanged || isVersionChanged)) initPageSearcher();
    }, [
        lang,
        version,
        versionedSearch
    ]);
    const handleQueryChangedImpl = async (value)=>{
        let newQuery = value;
        setQuery(newQuery);
        if (search && 'remote' === search.mode && search.searchLoading) setIsSearching(true);
        if (newQuery) {
            const searchResult = [];
            if ('beforeSearch' in __WEBPACK_EXTERNAL_MODULE_virtual_search_hooks_9d01d01f__) {
                const key = 'beforeSearch';
                const transformedQuery = await __WEBPACK_EXTERNAL_MODULE_virtual_search_hooks_9d01d01f__[key](newQuery);
                if (transformedQuery) newQuery = transformedQuery;
            }
            const defaultSearchResult = await pageSearcherRef.current?.match(newQuery);
            if (defaultSearchResult) searchResult.push(...defaultSearchResult);
            if ('onSearch' in __WEBPACK_EXTERNAL_MODULE_virtual_search_hooks_9d01d01f__) {
                const key = 'onSearch';
                const customSearchResult = await __WEBPACK_EXTERNAL_MODULE_virtual_search_hooks_9d01d01f__[key](newQuery, searchResult);
                if (customSearchResult) searchResult.push(...customSearchResult.map((item)=>({
                        renderType: types_RenderType.Custom,
                        ...item
                    })));
            }
            if ('afterSearch' in __WEBPACK_EXTERNAL_MODULE_virtual_search_hooks_9d01d01f__) {
                const key = 'afterSearch';
                await __WEBPACK_EXTERNAL_MODULE_virtual_search_hooks_9d01d01f__[key](newQuery, searchResult);
            }
            const currQuery = searchInputRef.current?.value;
            if (currQuery === newQuery) {
                setSearchResult(searchResult || DEFAULT_RESULT);
                setIsSearching(false);
            }
        }
    };
    const handleQueryChange = useDebounce(handleQueryChangedImpl);
    const normalizeSuggestions = (suggestions)=>suggestions.reduce((groups, item)=>{
            const group = item.group;
            if (!groups[group]) groups[group] = [];
            groups[group].push(item);
            return groups;
        }, {});
    const renderSearchResult = (result, searchOptions, isSearching)=>{
        if (1 === result.length) {
            const currentSearchResult = result[0].result;
            if (0 === currentSearchResult.length && !isSearching) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NoSearchResult, {
                query: query
            });
            return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                ref: searchResultTabRef,
                children: renderSearchResultItem(currentSearchResult, query, isSearching)
            });
        }
        const tabValues = result.map((item)=>{
            if (!searchOptions || 'remote' !== searchOptions.mode) return item.group;
            const indexItem = normalizeSearchIndexes(searchOptions.searchIndexes || []).find((indexInfo)=>indexInfo.value === item.group);
            return indexItem.label;
        });
        const renderKey = 'render';
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Tabs, {
            values: tabValues,
            tabContainerClassName: Search_index_module.tabClassName,
            onChange: (index)=>{
                setResultTabIndex(index);
                setCurrentSuggestionIndex(0);
            },
            ref: searchResultTabRef,
            children: result.map((item)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(Tab, {
                    children: [
                        item.renderType === types_RenderType.Default && renderSearchResultItem(item.result, query, isSearching),
                        item.renderType === types_RenderType.Custom && __WEBPACK_EXTERNAL_MODULE_virtual_search_hooks_9d01d01f__[renderKey](item.result)
                    ]
                }, item.group))
        });
    };
    const renderSearchResultItem = (suggestionList, query, isSearching)=>{
        if (isSearching) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: "flex flex-col items-center",
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_loading_5f550a25__["default"],
                className: "m-8 opacity-80"
            })
        });
        if (0 === suggestionList.length && !initing) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NoSearchResult, {
            query: query
        });
        const normalizedSuggestions = normalizeSuggestions(suggestionList);
        let accumulateIndex = -1;
        return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("ul", {
            className: Search_index_module.suggestList,
            children: Object.keys(normalizedSuggestions).map((group)=>{
                const groupSuggestions = normalizedSuggestions[group] || [];
                return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("li", {
                    children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("ul", {
                        className: "pb-2",
                        children: groupSuggestions.map((suggestion)=>{
                            accumulateIndex++;
                            const suggestionIndex = accumulateIndex;
                            return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SuggestItem, {
                                suggestion: suggestion,
                                isCurrent: suggestionIndex === currentSuggestionIndex,
                                setCurrentSuggestionIndex: (event)=>{
                                    if (mousePositionRef.current.pageX === event.pageX && mousePositionRef.current.pageY === event.pageY) return;
                                    setCanScroll(false);
                                    setCurrentSuggestionIndex(suggestionIndex);
                                },
                                onMouseMove: (event)=>{
                                    mousePositionRef.current = {
                                        pageX: event.pageX,
                                        pageY: event.pageY
                                    };
                                },
                                closeSearch: ()=>{
                                    clearSearchState();
                                },
                                inCurrentDocIndex: 0 === resultTabIndex,
                                scrollTo: scrollTo
                            }, `${suggestion.title}-${suggestionIndex}`);
                        })
                    })
                }, group);
            })
        });
    };
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
        children: focused && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_dom_7136dc57__.createPortal)(/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
            className: Search_index_module.mask,
            onClick: ()=>{
                clearSearchState();
            },
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: `${Search_index_module.modal}`,
                onClick: (e)=>{
                    setFocused(true);
                    e.stopPropagation();
                },
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                                className: Search_index_module.inputForm,
                                children: [
                                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("label", {
                                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                                            icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_search_1c295ce0__["default"]
                                        })
                                    }),
                                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("input", {
                                        className: `rspress-search-panel-input ${Search_index_module.input}`,
                                        ref: searchInputRef,
                                        placeholder: searchPlaceholderText,
                                        "aria-label": "SearchPanelInput",
                                        autoComplete: "off",
                                        autoFocus: true,
                                        onChange: (e)=>handleQueryChange(e.target.value)
                                    }),
                                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("label", {
                                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                                            icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_close_bcac2df4__["default"],
                                            className: Search_index_module.close,
                                            onClick: (e)=>{
                                                if (searchInputRef.current) {
                                                    e.stopPropagation();
                                                    if (query) {
                                                        searchInputRef.current.value = '';
                                                        setQuery('');
                                                    } else clearSearchState();
                                                }
                                            }
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("h2", {
                                className: "text-brand ml-2 sm:hidden cursor-pointer",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    clearSearchState();
                                },
                                children: "Cancel"
                            })
                        ]
                    }),
                    query && !initing ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: `${Search_index_module.searchHits}  rspress-scrollbar`,
                        ref: searchResultRef,
                        children: renderSearchResult(searchResult, search, isSearching)
                    }) : null
                ]
            })
        }), document.getElementById('search-container'))
    });
}
function Search() {
    const [focused, setFocused] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const [metaKey, setMetaKey] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(null);
    const { searchPlaceholderText = 'Search Docs' } = useLocaleSiteData();
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        setMetaKey(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl');
    }, []);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: `rspress-nav-search-button ${Search_index_module.navSearchButton}`,
                onClick: ()=>setFocused(true),
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("button", {
                    children: [
                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                            icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_search_1c295ce0__["default"],
                            width: "18",
                            height: "18"
                        }),
                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("p", {
                            className: Search_index_module.searchWord,
                            children: searchPlaceholderText
                        }),
                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                            style: {
                                opacity: metaKey ? 1 : 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                                    children: metaKey
                                }),
                                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                                    children: "K"
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: Search_index_module.mobileNavSearchButton,
                onClick: ()=>setFocused(true),
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                    icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_search_1c295ce0__["default"]
                })
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SearchPanel, {
                focused: focused,
                setFocused: setFocused
            })
        ]
    });
}
function SidebarDivider(props) {
    const { depth, dividerType } = props;
    const borderTypeStyle = 'dashed' === dividerType ? 'border-dashed' : 'border-solid';
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: `${borderTypeStyle} border-t border-divider-light my-3`,
        style: {
            marginLeft: 0 === depth ? 0 : '18px'
        }
    });
}
const Sidebar_index_module = {
    navTitleMask: "navTitleMask_fb17c",
    sidebar: "sidebar_dd719",
    sidebarContent: "sidebarContent_da296",
    open: "open_becbd",
    menuLink: "menuLink_bb039",
    menuItem: "menuItem_ac22e",
    collapseContainer: "collapseContainer_d6e4e",
    menuItemActive: "menuItemActive_de63c",
    menuGroupActive: "menuGroupActive_e3177"
};
function SidebarGroup(props) {
    const { item, depth = 0, activeMatcher, id, setSidebarData } = props;
    const navigate = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useNavigate)();
    const containerRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const transitionRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const innerRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    const initialRender = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(true);
    const initialState = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(item.collapsed);
    const active = item.link && activeMatcher(item.link);
    const { collapsed, collapsible = true } = item;
    const collapsibleIcon = /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        style: {
            cursor: 'pointer',
            transition: 'transform 0.2s ease-out',
            transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)'
        },
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
            icon: __WEBPACK_EXTERNAL_MODULE__theme_assets_arrow_right_3f3bb17d__["default"]
        })
    });
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if (initialRender.current) return;
        if (!containerRef.current || !innerRef.current) return;
        if (transitionRef.current) clearTimeout(transitionRef.current);
        const container = containerRef.current;
        const inner = innerRef.current;
        const contentHeight = inner.clientHeight + 4;
        if (collapsed) {
            container.style.maxHeight = `${contentHeight}px`;
            container.style.transitionDuration = '0.5s';
            inner.style.opacity = '0';
            transitionRef.current = setTimeout(()=>{
                if (containerRef.current) containerRef.current.style.maxHeight = '0px';
            }, 0);
        } else {
            container.style.maxHeight = `${contentHeight}px`;
            container.style.transitionDuration = '0.3s';
            inner.style.opacity = '1';
            transitionRef.current = setTimeout(()=>{
                if (containerRef.current) containerRef.current.style.removeProperty('max-height');
            }, 300);
        }
    }, [
        collapsed
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        initialRender.current = false;
    }, []);
    const toggleCollapse = (e)=>{
        e.stopPropagation();
        setSidebarData((sidebarData)=>{
            const newSidebarData = [
                ...sidebarData
            ];
            const indexes = id.split('-').map(Number);
            const initialIndex = indexes.shift();
            const root = newSidebarData[initialIndex];
            let current = root;
            for (const index of indexes)current = current.items[index];
            if ('items' in current) current.collapsed = !current.collapsed;
            return newSidebarData;
        });
    };
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("section", {
        className: "rspress-sidebar-section mt-0.5 block",
        "data-context": item.context,
        style: {
            marginLeft: 0 === depth ? 0 : '18px'
        },
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: `rspress-sidebar-collapse flex justify-between items-center ${active ? Sidebar_index_module.menuItemActive : Sidebar_index_module.menuItem}`,
                "data-context": item.context,
                onMouseEnter: ()=>item.link && preloadLink(item.link),
                onClick: (e)=>{
                    if (item.link) navigate((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.withBase)((0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(item.link)));
                    collapsible && toggleCollapse(e);
                },
                style: {
                    borderRadius: 0 === depth ? '0 var(--rp-radius) var(--rp-radius) 0' : void 0,
                    cursor: collapsible || item.link ? 'pointer' : 'normal'
                },
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("h2", {
                        className: "py-2 px-3 text-sm font-medium flex",
                        style: {
                            ...0 === depth ? highlightTitleStyle : {}
                        },
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Tag, {
                                tag: item.tag
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                                className: "flex-center",
                                style: {
                                    fontSize: 0 === depth ? '14px' : '13px'
                                },
                                children: renderInlineMarkdown(item.text)
                            })
                        ]
                    }),
                    collapsible && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: `${Sidebar_index_module.collapseContainer} p-2 rounded-xl`,
                        onClick: toggleCollapse,
                        children: collapsibleIcon
                    })
                ]
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                ref: containerRef,
                className: "transition-all duration-300 ease-in-out",
                style: {
                    overflow: 'hidden',
                    maxHeight: initialState.current ? 0 : void 0
                },
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    ref: innerRef,
                    className: "rspress-sidebar-group transition-opacity duration-500 ease-in-out",
                    style: {
                        opacity: initialState.current ? 0 : 1,
                        marginLeft: 0 === depth ? '12px' : 0
                    },
                    children: item?.items?.map((item, index)=>isSidebarDivider(item) ? /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx(SidebarDivider, {
                            depth: depth + 1,
                            dividerType: item.dividerType
                        }, index) : /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx("div", {
                            className: "rspress-sidebar-item",
                            "data-context": item.context,
                            children: /*#__PURE__*/ __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx(SidebarItem, {
                                ...props,
                                item: item,
                                depth: depth + 1,
                                id: `${id}-${index}`
                            })
                        }, index))
                })
            })
        ]
    }, id);
}
function SidebarItem(props) {
    const { item, depth = 0, activeMatcher, id, setSidebarData } = props;
    const active = 'link' in item && item.link && activeMatcher(item.link);
    const ref = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(null);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if (active) ref.current?.scrollIntoView({
            block: 'center'
        });
    }, []);
    if ('items' in item) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SidebarGroup, {
        id: id,
        activeMatcher: activeMatcher,
        item: item,
        depth: depth,
        collapsed: item.collapsed,
        setSidebarData: setSidebarData
    }, `${item.text}-${id}`);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Link, {
        href: (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.normalizeHrefInRuntime)(item.link),
        className: Sidebar_index_module.menuLink,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
            ref: ref,
            onMouseEnter: ()=>preloadLink(item.link),
            className: `${active ? Sidebar_index_module.menuItemActive : Sidebar_index_module.menuItem} mt-0.5 py-2 px-3 font-medium flex`,
            style: {
                fontSize: 0 === depth ? '14px' : '13px',
                marginLeft: 0 === depth ? 0 : '18px',
                borderRadius: '0 var(--rp-radius) var(--rp-radius) 0',
                ...0 === depth ? highlightTitleStyle : {}
            },
            children: [
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Tag, {
                    tag: item.tag
                }),
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                    children: renderInlineMarkdown(item.text)
                })
            ]
        })
    });
}
function SidebarSectionHeader({ sectionHeaderText, tag }) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "rspress-sidebar-section-header",
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__theme_75e53063__.Tag, {
                tag: tag
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                children: renderInlineMarkdown(sectionHeaderText)
            })
        ]
    });
}
const highlightTitleStyle = {
    fontSize: '14px',
    paddingLeft: '24px',
    fontWeight: 'bold'
};
let bodyStyleOverflow;
let matchCache = new WeakMap();
function Sidebar(props) {
    const { isSidebarOpen, beforeSidebar, afterSidebar, uiSwitch, navTitle } = props;
    const { pathname: rawPathname } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.useLocation)();
    const { items: rawSidebarData } = useSidebarData();
    const [sidebarData, setSidebarData] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(()=>rawSidebarData.filter(Boolean).flat());
    const pathname = decodeURIComponent(rawPathname);
    const activeMatcher = useActiveMatcher();
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if ((0, __WEBPACK_EXTERNAL_MODULE__rspress_shared_baa012d0__.inBrowser)()) {
            if (isSidebarOpen) {
                bodyStyleOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
            } else document.body.style.overflow = bodyStyleOverflow || '';
        }
    }, [
        isSidebarOpen
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if (rawSidebarData === sidebarData) return;
        matchCache = new WeakMap();
        const match = (item)=>{
            if (matchCache.has(item)) return matchCache.get(item);
            if ('link' in item && item.link && activeMatcher(item.link)) {
                matchCache.set(item, true);
                return true;
            }
            if ('items' in item) {
                const result = item.items.some((child)=>match(child));
                if (result) {
                    matchCache.set(item, true);
                    return true;
                }
            }
            matchCache.set(item, false);
            return false;
        };
        const traverse = (item)=>{
            if ('items' in item) {
                item.items.forEach(traverse);
                if (match(item)) item.collapsed = false;
            }
        };
        const newSidebarData = rawSidebarData.filter(Boolean).flat();
        newSidebarData.forEach(traverse);
        setSidebarData(newSidebarData);
    }, [
        rawSidebarData,
        pathname
    ]);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("aside", {
        className: `${Sidebar_index_module.sidebar} rspress-sidebar ${isSidebarOpen ? Sidebar_index_module.open : ''}`,
        children: [
            uiSwitch?.showNavbar ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: Sidebar_index_module.navTitleMask,
                children: navTitle || /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(NavBarTitle, {})
            }) : null,
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: `rspress-scrollbar ${Sidebar_index_module.sidebarContent}`,
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("nav", {
                    className: "pb-2",
                    children: [
                        beforeSidebar,
                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SidebarList, {
                            sidebarData: sidebarData,
                            setSidebarData: setSidebarData
                        }),
                        afterSidebar
                    ]
                })
            })
        ]
    });
}
function SidebarList({ sidebarData, setSidebarData }) {
    const activeMatcher = useActiveMatcher();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {
        children: sidebarData.map((item, index)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SidebarListItem, {
                item: item,
                index: index,
                setSidebarData: setSidebarData,
                activeMatcher: activeMatcher
            }, index))
    });
}
function SidebarListItem(props) {
    const { item, index, setSidebarData, activeMatcher } = props;
    if (isSidebarDivider(item)) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SidebarDivider, {
        depth: 0,
        dividerType: item.dividerType
    }, index);
    if (isSidebarSectionHeader(item)) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SidebarSectionHeader, {
        sectionHeaderText: item.sectionHeaderText,
        tag: item.tag
    }, index);
    if (isSideBarCustomLink(item)) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: "rspress-sidebar-item rspress-sidebar-custom-link",
        "data-context": item.context,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SidebarItem, {
            id: String(index),
            item: item,
            depth: 0,
            collapsed: item.collapsed ?? true,
            setSidebarData: setSidebarData,
            activeMatcher: activeMatcher
        }, index)
    }, index);
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SidebarItem, {
        id: String(index),
        item: item,
        depth: 0,
        activeMatcher: activeMatcher,
        collapsed: item.collapsed ?? true,
        setSidebarData: setSidebarData
    }, index);
}
const SourceCode_index_module = {
    sourceCode: "sourceCode_c1837"
};
function SourceCode(props) {
    const { href, platform = 'github' } = props;
    const { sourceCodeText = 'Source' } = useLocaleSiteData();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: `inline-block rounded border border-solid border-gray-light-3 dark:border-divider text-gray-400 ${SourceCode_index_module.sourceCode}`,
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("a", {
            href: href,
            target: "_blank",
            className: "flex items-center content-center transition-all duration-300 text-xs block px-2 py-1 ",
            children: [
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                    className: "mr-2 inline-flex w-4 h-4",
                    children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(SvgWrapper, {
                        icon: 'gitlab' === platform ? __WEBPACK_EXTERNAL_MODULE__theme_assets_gitlab_a0e4f082__["default"] : __WEBPACK_EXTERNAL_MODULE__theme_assets_github_cac38251__["default"]
                    })
                }),
                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                    children: sourceCodeText
                })
            ]
        })
    });
}
const Steps_index_module = {
    rspressSteps: "rspressSteps_f17c8"
};
function Steps({ children }) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        className: `ml-4 mb-11 border-l pl-6 ${Steps_index_module.rspressSteps} [counter-reset:step]`,
        children: children
    });
}
const Tag = ({ tag })=>{
    if (!tag) return null;
    const isSvgTagString = tag.trim().startsWith('<svg');
    if (isSvgTagString) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
        dangerouslySetInnerHTML: {
            __html: tag
        },
        style: {
            width: 20,
            marginRight: 4
        }
    });
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
        src: tag
    });
};
const TocItem = ({ header, onItemClick })=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("li", {
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("a", {
            href: `#${header.id}`,
            className: 'rspress-toc-link sm:text-normal text-sm',
            style: {
                marginLeft: (header.depth - 2) * 12
            },
            onClick: (e)=>{
                e.preventDefault();
                window.location.hash = header.id;
                const target = document.getElementById(header.id);
                if (target) scrollToTarget(target, false);
                onItemClick?.(header);
            },
            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                className: 'rspress-toc-link-text block',
                children: renderInlineMarkdown(header.text)
            })
        })
    }, header.id);
function Toc({ onItemClick }) {
    const { page } = (0, __WEBPACK_EXTERNAL_MODULE__rspress_runtime_0abd3046__.usePageData)();
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("ul", {
        children: page.toc.map((item)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(TocItem, {
                header: item,
                onItemClick: onItemClick
            }, item.id))
    });
}
const src_rslib_entry_ = {
    Layout: Layout,
    NotFoundLayout: NotFoundLayout,
    HomeLayout: HomeLayout,
    setup: setup
};
export { Aside, Badge, Button, Card, DocFooter, DocLayout, EditLink, HomeFeature, HomeFooter, HomeHero, HomeLayout, LastUpdated, Layout, Link, LinkCard, Nav, NotFoundLayout, Overview, PackageManagerTabs, PrevNextPage, types_RenderType as RenderType, ScrollToTop, Search, SearchPanel, Sidebar, SidebarList, SocialLinks, SourceCode, Steps, SwitchAppearance, Tab, Tabs, Tag, Toc, bindingAsideScroll, src_rslib_entry_ as default, getCustomMDXComponent, utils_isActive as isActive, isMobileDevice, parseInlineMarkdownText, renderHtmlOrText, renderInlineMarkdown, scrollToTarget, setup, useEditLink, useEnableNav, useFullTextSearch, useHiddenNav, useLocaleSiteData, usePathUtils, usePrevNextPage, useRedirect4FirstVisit, useSidebarData, useThemeState };
