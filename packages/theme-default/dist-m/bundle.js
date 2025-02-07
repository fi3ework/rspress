var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/layout/DocLayout/index.tsx
import { MDXProvider } from "@mdx-js/react";
import { Content, NoSSR, usePageData as usePageData8 } from "@rspress/runtime";
import { Overview, ScrollToTop, getCustomMDXComponent } from "@theme";
import { slug } from "github-slugger";
import { useMemo as useMemo2, useState as useState7 } from "react";

// src/components/Aside/index.tsx
import { useEffect as useEffect7 } from "react";

// src/logic/usePrevNextPage.ts
import { isEqualPath as isEqualPath2, useLocation as useLocation2, withBase as withBase2 } from "@rspress/runtime";

// src/logic/useSidebarData.ts
import { isEqualPath, useLocation, withBase } from "@rspress/runtime";
import {
  addTrailingSlash as addTrailingSlash2
} from "@rspress/shared";
import { useMemo } from "react";

// src/logic/useLocaleSiteData.ts
import { usePageData } from "@rspress/runtime";
import { addTrailingSlash } from "@rspress/shared";
function useLocaleSiteData() {
  var _a, _b, _c;
  const pageData = usePageData();
  const {
    page: { lang }
  } = pageData;
  const themeConfig = (_b = (_a = pageData == null ? void 0 : pageData.siteData) == null ? void 0 : _a.themeConfig) != null ? _b : {};
  const defaultLang = (_c = pageData.siteData.lang) != null ? _c : "";
  const locales = themeConfig == null ? void 0 : themeConfig.locales;
  if (!locales || locales.length === 0) {
    return {
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
  }
  const localeInfo = locales.find((locale) => locale.lang === lang);
  return __spreadProps(__spreadValues({}, localeInfo), {
    langRoutePrefix: lang === defaultLang ? "/" : addTrailingSlash(lang)
  });
}

// src/logic/useSidebarData.ts
var matchPath = (pattern, currentPathname) => {
  const prefix = withBase(pattern);
  if (prefix === currentPathname) {
    return true;
  }
  const prefixWithTrailingSlash = addTrailingSlash2(prefix);
  return currentPathname.startsWith(prefixWithTrailingSlash);
};
var match = (item, currentPathname) => {
  const isLink = "link" in item && item.link !== "";
  const isDir = "items" in item;
  if (!isDir && isLink) {
    if (isEqualPath(withBase(item.link), currentPathname)) {
      return item;
    }
    if (currentPathname.includes("index") && isEqualPath(`${item.link}/index`, currentPathname)) {
      return item;
    }
  }
  if (isDir) {
    if (isLink && (isEqualPath(withBase(item.link), currentPathname) || isEqualPath(withBase(`${item.link}/index`), currentPathname))) {
      return item;
    }
    for (const childItem of item.items) {
      const matched = match(childItem, currentPathname);
      if (matched) {
        return matched;
      }
    }
  }
  return void 0;
};
var getSidebarData = (sidebar, currentPathname) => {
  for (const name of Object.keys(sidebar)) {
    if (matchPath(name, currentPathname)) {
      const sidebarGroup = sidebar[name];
      const group = sidebarGroup.find((item) => match(item, currentPathname));
      return {
        group: group && "text" in group ? group.text : "",
        items: sidebarGroup
      };
    }
  }
  return {
    group: "Documentation",
    items: []
  };
};
function useSidebarData() {
  const { sidebar } = useLocaleSiteData();
  const { pathname: rawPathname } = useLocation();
  const pathname = decodeURIComponent(rawPathname);
  const sidebarData = useMemo(() => {
    return getSidebarData(sidebar, pathname);
  }, [sidebar, pathname]);
  return sidebarData;
}

// src/logic/usePrevNextPage.ts
function usePrevNextPage() {
  const { pathname } = useLocation2();
  const { items } = useSidebarData();
  const flattenTitles = [];
  const walk = (sidebarItem) => {
    if ("items" in sidebarItem) {
      if (sidebarItem.link) {
        flattenTitles.push({
          text: sidebarItem.text,
          link: sidebarItem.link
        });
      }
      sidebarItem.items.forEach((item) => {
        !("dividerType" in item) && walk(item);
      });
    } else {
      flattenTitles.push(sidebarItem);
    }
  };
  items.forEach((item) => !("dividerType" in item) && walk(item));
  const pageIndex = flattenTitles.findIndex(
    (item) => isEqualPath2(withBase2(item.link), pathname)
  );
  const prevPage = flattenTitles[pageIndex - 1] || null;
  const nextPage = flattenTitles[pageIndex + 1] || null;
  return {
    prevPage,
    nextPage
  };
}

// src/logic/useEditLink.ts
import { usePageData as usePageData2 } from "@rspress/runtime";
function useEditLink() {
  var _a, _b, _c;
  const { siteData: siteData3, page } = usePageData2();
  const locales = useLocaleSiteData();
  const editLink = (_c = (_b = locales.editLink) != null ? _b : (_a = siteData3.themeConfig) == null ? void 0 : _a.editLink) != null ? _c : {};
  if (!editLink.docRepoBaseUrl || !editLink.text) {
    return null;
  }
  let { docRepoBaseUrl } = editLink;
  if (!docRepoBaseUrl.endsWith("/")) {
    docRepoBaseUrl += "/";
  }
  const relativePagePath = page._relativePath.replace(/\\/g, "/");
  const link = `${docRepoBaseUrl}${relativePagePath}`;
  return {
    text: editLink.text,
    link
  };
}

// src/logic/useHiddenNav.ts
import { useLocation as useLocation3, usePageData as usePageData3 } from "@rspress/runtime";
import { throttle } from "lodash-es";
import { useEffect, useRef, useState } from "react";
function useEnableNav() {
  var _a;
  const {
    siteData: { themeConfig },
    page: { frontmatter = {} }
  } = usePageData3();
  const initialState = ((_a = frontmatter == null ? void 0 : frontmatter.navbar) != null ? _a : true) && (themeConfig == null ? void 0 : themeConfig.hideNavbar) !== "always";
  const [enableNav, setEnableNav] = useState(initialState);
  return [enableNav, setEnableNav];
}
function useHiddenNav() {
  var _a;
  const {
    siteData: { themeConfig }
  } = usePageData3();
  const hiddenBehavior = (_a = themeConfig.hideNavbar) != null ? _a : "never";
  const [hiddenNav, setHiddenNav] = useState(false);
  const { pathname } = useLocation3();
  const lastScrollTop = useRef(0);
  if (hiddenBehavior === "never") {
    return false;
  }
  if (hiddenBehavior === "always") {
    return true;
  }
  useEffect(() => {
    setHiddenNav(false);
    const onScrollListen = throttle(() => {
      const { scrollTop } = document.documentElement;
      if (scrollTop === lastScrollTop.current) {
        return;
      }
      const shouldHidden = lastScrollTop.current > 0 && scrollTop - lastScrollTop.current > 0;
      setHiddenNav(shouldHidden);
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    }, 200);
    window.addEventListener("scroll", onScrollListen);
    return () => {
      window.removeEventListener("scroll", onScrollListen);
    };
  }, [pathname]);
  return hiddenNav;
}

// src/logic/sideEffects.ts
import { inBrowser } from "@rspress/shared";
import { throttle as throttle2 } from "lodash-es";
var DEFAULT_NAV_HEIGHT = 72;
function getTargetTop(element, fallbackHeight = DEFAULT_NAV_HEIGHT) {
  const targetPadding = Number.parseInt(
    window.getComputedStyle(element).paddingTop,
    10
  );
  const targetTop = window.scrollY + element.getBoundingClientRect().top - fallbackHeight - targetPadding;
  return Math.round(targetTop);
}
function scrollToTarget(target, isSmooth, fallbackHeight = DEFAULT_NAV_HEIGHT) {
  window.scrollTo(__spreadValues({
    left: 0,
    top: getTargetTop(target, fallbackHeight)
  }, isSmooth ? { behavior: "smooth" } : {}));
}
function bindingWindowScroll() {
  function scrollTo(el, hash, isSmooth = false) {
    let target = null;
    try {
      target = el.classList.contains("header-anchor") ? el : document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch (e) {
      console.warn(e);
    }
    if (target) {
      scrollToTarget(target, isSmooth);
    }
  }
  window.addEventListener(
    "click",
    (e) => {
      const link = e.target.closest("a");
      if (link) {
        const { origin, hash, target, pathname, search } = link;
        const currentUrl = window.location;
        if (hash && target !== "_blank" && origin === currentUrl.origin) {
          if (pathname === currentUrl.pathname && search === currentUrl.search && hash && link.classList.contains("header-anchor")) {
            e.preventDefault();
            history.pushState(null, "", hash);
            scrollTo(link, hash, true);
            window.dispatchEvent(new Event("hashchange"));
          } else {
            window.addEventListener("RspressReloadContent", () => {
              if (location.hash.length > 1) {
                const ele = document.getElementById(location.hash.slice(1));
                scrollToTarget(ele, false);
              }
            });
          }
        }
      }
    },
    { capture: true }
  );
  window.addEventListener("hashchange", (e) => {
    e.preventDefault();
  });
}
function bindingAsideScroll() {
  function isBottom() {
    return document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight;
  }
  const aside = document.getElementById("aside-container");
  const links = Array.from(
    document.querySelectorAll(".rspress-doc .header-anchor")
  ).filter((item) => {
    var _a;
    return ((_a = item.parentElement) == null ? void 0 : _a.tagName) !== "H1";
  });
  if (!aside || !links.length) {
    return;
  }
  let prevActiveLink = null;
  const headers = Array.from((aside == null ? void 0 : aside.getElementsByTagName("a")) || []).map(
    (item) => decodeURIComponent(item.hash)
  );
  if (!headers.length) {
    return;
  }
  const activate = (links2, index) => {
    if (links2[index]) {
      const id = links2[index].getAttribute("href");
      const currentLink = aside == null ? void 0 : aside.querySelector(`a[href="#${id == null ? void 0 : id.slice(1)}"]`);
      if (currentLink) {
        if (prevActiveLink) {
          prevActiveLink.classList.remove("aside-active");
        }
        prevActiveLink = currentLink;
        prevActiveLink.classList.add("aside-active");
      }
    }
  };
  const setActiveLink = () => {
    if (isBottom()) {
      activate(links, links.length - 1);
    } else {
      for (let i = 0; i < links.length; i++) {
        const currentAnchor = links[i];
        const nextAnchor = links[i + 1];
        const scrollTop = Math.ceil(window.scrollY);
        const currentAnchorTop = getTargetTop(currentAnchor.parentElement);
        if (i === 0 && scrollTop < currentAnchorTop || scrollTop === 0) {
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
    }
  };
  const throttledSetLink = throttle2(setActiveLink, 200);
  window.addEventListener("scroll", throttledSetLink);
  setActiveLink();
  return () => {
    if (prevActiveLink) {
      prevActiveLink.classList.remove("aside-active");
    }
    window.removeEventListener("scroll", throttledSetLink);
  };
}
function setup() {
  if (!inBrowser()) {
    return;
  }
  bindingWindowScroll();
}

// src/logic/usePathUtils.ts
import {
  normalizeHrefInRuntime as normalizeHref,
  removeBase,
  useLang,
  usePageData as usePageData4,
  useVersion,
  withBase as withBase3
} from "@rspress/runtime";
import { isExternalUrl } from "@rspress/shared";
function usePathUtils() {
  const currentLang = useLang();
  const currentVersion = useVersion();
  const pageData = usePageData4();
  const defaultLang = pageData.siteData.lang;
  const defaultVersion = pageData.siteData.multiVersion.default;
  const normalizeLinkHref = (rawHref) => {
    let href = rawHref;
    if ((defaultLang || defaultVersion) && !isExternalUrl(href) && !href.startsWith("#")) {
      href = removeBase(href);
      const linkParts = href.split("/").filter(Boolean);
      let versionPart = "";
      let langPart = "";
      let purePathPart = "";
      if (defaultVersion) {
        if (currentVersion !== defaultVersion) {
          versionPart = currentVersion;
          if (linkParts[0] === currentVersion) {
            linkParts.shift();
          }
        } else if (linkParts[0] === defaultVersion) {
          linkParts.shift();
        }
      }
      if (defaultLang) {
        if (currentLang !== defaultLang) {
          langPart = currentLang;
          if (linkParts[0] === currentLang) {
            linkParts.shift();
          }
        } else if (linkParts[0] === defaultLang) {
          linkParts.shift();
        }
      }
      purePathPart = linkParts.join("/");
      return normalizeHref(
        withBase3(
          [versionPart, langPart, purePathPart].filter(Boolean).join("/")
        )
      );
    }
    return href;
  };
  return {
    normalizeLinkHref
  };
}

// src/logic/useFullTextSearch.ts
import { usePageData as usePageData5 } from "@rspress/runtime";
import { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";

// src/components/Search/logic/search.ts
import { normalizeHrefInRuntime as normalizeHref2 } from "@rspress/runtime";

// src/components/Search/logic/Provider.ts
var LOCAL_INDEX = "default";

// src/components/Search/logic/providers/LocalProvider.ts
import {
  SEARCH_INDEX_NAME,
  removeTrailingSlash
} from "@rspress/shared";
import FlexSearchDocument from "flexsearch/dist/module/document";
import searchIndexHash from "virtual-search-index-hash";

// src/components/Search/logic/util.ts
var kRegex = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/u;
var cyrillicRegex = /[\u0400-\u04FF]/u;
function backTrackHeaders(rawHeaders, index) {
  let current = rawHeaders[index];
  let currentIndex = index;
  const res = [current];
  while (current && current.depth > 2) {
    let matchedParent = false;
    for (let i = currentIndex - 1; i >= 0; i--) {
      const header = rawHeaders[i];
      if (header.depth > 1 && header.depth === current.depth - 1) {
        current = header;
        currentIndex = i;
        res.unshift(current);
        matchedParent = true;
        break;
      }
    }
    if (!matchedParent) {
      break;
    }
  }
  return res;
}
function normalizeTextCase(text) {
  const textNormalized = text.toString().toLowerCase().normalize("NFD");
  const resultWithAccents = textNormalized;
  const resultWithoutAccents = textNormalized.replace(/[\u0300-\u036f]/g, "");
  if (cyrillicRegex.test(String(text))) {
    return resultWithAccents.normalize("NFC");
  }
  if (kRegex.test(String(text))) {
    return resultWithoutAccents.normalize("NFC");
  }
  return resultWithoutAccents;
}
function removeDomain(url) {
  return url.replace(/https?:\/\/[^/]+/, "");
}
function getCharByteCount(char) {
  const charCode = char.charCodeAt(0);
  if (charCode > 255) {
    return 3;
  }
  return 1;
}
var normalizeSearchIndexes = (items) => {
  return items.map(
    (item) => typeof item === "string" ? {
      value: item,
      label: item
    } : item
  );
};
function substrByBytes(str, start, len) {
  let resultStr = "";
  let bytesCount = 0;
  const strLength = str.length;
  for (let i = 0; i < strLength; i++) {
    bytesCount += getCharByteCount(str.charAt(i));
    if (bytesCount > start + len) {
      break;
    }
    if (bytesCount > start) {
      resultStr += str.charAt(i);
    }
  }
  return resultStr;
}
function byteToCharIndex(str, byteIndex) {
  let charIndex = 0;
  let byteCount = 0;
  for (let i = 0; i < str.length; i++) {
    if (byteCount >= byteIndex) {
      break;
    }
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
  for (let i = 0; i < str.length; i++) {
    byteLength += getCharByteCount(str.charAt(i));
  }
  return byteLength;
}

// src/components/Search/logic/providers/LocalProvider.ts
var cjkRegex = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]|[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]|[\u3041-\u3096]|[\u30A1-\u30FA]/giu;
var cyrillicRegex2 = /[\u0400-\u04FF]/g;
function tokenize(str, regex) {
  const words = [];
  let m = null;
  do {
    m = regex.exec(str);
    if (m) {
      words.push(m[0]);
    }
  } while (m);
  return words;
}
var _index, _cjkIndex, _cyrillicIndex, _getPages, getPages_fn;
var LocalProvider = class {
  constructor() {
    __privateAdd(this, _getPages);
    __privateAdd(this, _index, void 0);
    __privateAdd(this, _cjkIndex, void 0);
    __privateAdd(this, _cyrillicIndex, void 0);
  }
  init(options) {
    return __async(this, null, function* () {
      const { currentLang, currentVersion } = options;
      const versioned = options.mode !== "remote" && options.versioned;
      const pagesForSearch = (yield __privateMethod(this, _getPages, getPages_fn).call(this, currentLang, versioned ? currentVersion : "")).map((page) => __spreadProps(__spreadValues({}, page), {
        normalizedContent: normalizeTextCase(page.content),
        headers: page.toc.map((header) => normalizeTextCase(header.text)).join(" "),
        normalizedTitle: normalizeTextCase(page.title)
      }));
      const createOptions = {
        tokenize: "full",
        document: {
          id: "id",
          store: true,
          index: ["normalizedTitle", "headers", "normalizedContent"]
        },
        cache: 100
        // charset: {
        //   split: /\W+/,
        // },
      };
      __privateSet(this, _index, new FlexSearchDocument(createOptions));
      __privateSet(this, _cjkIndex, new FlexSearchDocument(__spreadProps(__spreadValues({}, createOptions), {
        tokenize: (str) => tokenize(str, cjkRegex)
      })));
      __privateSet(this, _cyrillicIndex, new FlexSearchDocument(__spreadProps(__spreadValues({}, createOptions), {
        tokenize: (str) => tokenize(str, cyrillicRegex2)
      })));
      for (const item of pagesForSearch) {
        __privateGet(this, _index).add(item);
        __privateGet(this, _cjkIndex).add(item);
        __privateGet(this, _cyrillicIndex).add(item);
      }
    });
  }
  search(query) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      const { keyword, limit } = query;
      const options = {
        enrich: true,
        limit,
        index: ["normalizedTitle", "headers", "normalizedContent"]
      };
      const searchResult = yield Promise.all([
        (_a = __privateGet(this, _index)) == null ? void 0 : _a.search(keyword, limit, options),
        (_b = __privateGet(this, _cjkIndex)) == null ? void 0 : _b.search(keyword, limit, options),
        (_c = __privateGet(this, _cyrillicIndex)) == null ? void 0 : _c.search(keyword, limit, options)
      ]);
      const combinedSearchResult = [];
      const pushedId = /* @__PURE__ */ new Set();
      function insertCombinedSearchResult(resultFromOneSearchIndex) {
        for (const item of resultFromOneSearchIndex) {
          item.result.forEach((resultItem) => {
            const id = resultItem.id;
            if (pushedId.has(id)) {
              return;
            }
            pushedId.add(id);
            combinedSearchResult.push(resultItem.doc);
          });
        }
      }
      searchResult.forEach((searchResultItem) => {
        searchResultItem && insertCombinedSearchResult(searchResultItem);
      });
      return [
        {
          index: LOCAL_INDEX,
          hits: combinedSearchResult
        }
      ];
    });
  }
};
_index = new WeakMap();
_cjkIndex = new WeakMap();
_cyrillicIndex = new WeakMap();
_getPages = new WeakSet();
getPages_fn = function(lang, version) {
  return __async(this, null, function* () {
    const searchIndexGroupID = `${version}###${lang}`;
    const searchIndexVersion = version ? `.${version.replace(".", "_")}` : "";
    const searchIndexLang = lang ? `.${lang}` : "";
    const result = yield fetch(
      `${removeTrailingSlash(__webpack_public_path__)}/static/${SEARCH_INDEX_NAME}${searchIndexVersion}${searchIndexLang}.${searchIndexHash[searchIndexGroupID]}.json`
    );
    return result.json();
  });
};

// src/components/Search/logic/providers/RemoteProvider.ts
function buildQueryString(params) {
  return Object.entries(params).map((pair) => pair.map(encodeURIComponent).join("=")).join("&");
}
var _options;
var RemoteProvider = class {
  constructor() {
    __privateAdd(this, _options, void 0);
  }
  init(options) {
    return __async(this, null, function* () {
      __privateSet(this, _options, options);
    });
  }
  search(query) {
    return __async(this, null, function* () {
      var _a, _b;
      const { apiUrl, searchIndexes } = __privateGet(this, _options);
      const { keyword, limit } = query;
      const urlParams = buildQueryString({
        keyword,
        limit: limit.toString(),
        searchIndexes: (searchIndexes == null ? void 0 : searchIndexes.map(
          (indexInfo) => typeof indexInfo === "string" ? indexInfo : indexInfo.value
        ).join(",")) || "",
        lang: (_b = (_a = __privateGet(this, _options)) == null ? void 0 : _a.currentLang) != null ? _b : ""
      });
      try {
        const result = yield fetch(`${apiUrl}?${urlParams}`);
        return result.json();
      } catch (e) {
        console.error(e);
        return [];
      }
    });
  }
};
_options = new WeakMap();

// src/components/Search/logic/types.ts
var RenderType = /* @__PURE__ */ ((RenderType2) => {
  RenderType2["Default"] = "default";
  RenderType2["Custom"] = "custom";
  return RenderType2;
})(RenderType || {});

// src/components/Search/logic/search.ts
var THRESHOLD_CONTENT_LENGTH = 100;
var _options2, _indexName, _provider, _matchResultItem, matchResultItem_fn, _matchTitle, matchTitle_fn, _matchHeader, matchHeader_fn, _matchContent, matchContent_fn, _normalizeStatement, normalizeStatement_fn, _isCurrentIndex, isCurrentIndex_fn;
var PageSearcher = class {
  constructor(options) {
    __privateAdd(this, _matchResultItem);
    __privateAdd(this, _matchTitle);
    __privateAdd(this, _matchHeader);
    __privateAdd(this, _matchContent);
    __privateAdd(this, _normalizeStatement);
    __privateAdd(this, _isCurrentIndex);
    __privateAdd(this, _options2, void 0);
    __privateAdd(this, _indexName, LOCAL_INDEX);
    __privateAdd(this, _provider, void 0);
    var _a;
    __privateSet(this, _options2, options);
    __privateSet(this, _indexName, (_a = options.indexName) != null ? _a : LOCAL_INDEX);
    switch (options.mode) {
      case "remote":
        __privateSet(this, _provider, new RemoteProvider());
        break;
      default:
        __privateSet(this, _provider, new LocalProvider());
        break;
    }
  }
  init() {
    return __async(this, null, function* () {
      var _a;
      yield (_a = __privateGet(this, _provider)) == null ? void 0 : _a.init(__privateGet(this, _options2));
    });
  }
  match(keyword, limit = 7) {
    return __async(this, null, function* () {
      var _a;
      const searchResult = yield (_a = __privateGet(this, _provider)) == null ? void 0 : _a.search({ keyword, limit });
      const normalizedKeyWord = normalizeTextCase(keyword);
      const currentIndexInfo = (searchResult == null ? void 0 : searchResult.find(
        (res) => __privateMethod(this, _isCurrentIndex, isCurrentIndex_fn).call(this, res.index)
      )) || {
        index: LOCAL_INDEX,
        renderType: "default" /* Default */,
        hits: []
      };
      const matchResult = [
        {
          group: __privateGet(this, _indexName),
          renderType: "default" /* Default */,
          result: __privateMethod(this, _matchResultItem, matchResultItem_fn).call(this, normalizedKeyWord, currentIndexInfo)
        },
        ...((searchResult == null ? void 0 : searchResult.filter((res) => !__privateMethod(this, _isCurrentIndex, isCurrentIndex_fn).call(this, res.index))) || []).map((res) => ({
          group: res.index,
          renderType: "default" /* Default */,
          result: __privateMethod(this, _matchResultItem, matchResultItem_fn).call(this, normalizedKeyWord, res)
        }))
      ];
      return matchResult;
    });
  }
};
_options2 = new WeakMap();
_indexName = new WeakMap();
_provider = new WeakMap();
_matchResultItem = new WeakSet();
matchResultItem_fn = function(normalizedKeyWord, resultItem) {
  const matchedResult = [];
  resultItem == null ? void 0 : resultItem.hits.forEach((item) => {
    __privateMethod(this, _matchTitle, matchTitle_fn).call(this, item, normalizedKeyWord, matchedResult);
    const matchHeaderSet = __privateMethod(this, _matchHeader, matchHeader_fn).call(this, item, normalizedKeyWord, matchedResult);
    __privateMethod(this, _matchContent, matchContent_fn).call(this, item, normalizedKeyWord, matchedResult, matchHeaderSet);
  });
  return matchedResult;
};
_matchTitle = new WeakSet();
matchTitle_fn = function(item, query, matchedResult) {
  const { title = "" } = item;
  const normalizedTitle = normalizeTextCase(title);
  if (normalizedTitle.includes(query)) {
    matchedResult.push({
      type: "title",
      title,
      header: title,
      link: `${item.domain}${normalizeHref2(item.routePath)}`,
      query,
      highlightInfoList: [
        {
          start: normalizedTitle.indexOf(query),
          length: getStrByteLength(query)
        }
      ],
      group: __privateGet(this, _options2).extractGroupName(item.routePath)
    });
    return true;
  }
  return false;
};
_matchHeader = new WeakSet();
matchHeader_fn = function(item, query, matchedResult) {
  const matchHeaderSet = /* @__PURE__ */ new WeakSet();
  const { toc = [], domain = "", title = "" } = item;
  for (const [index, header] of toc.entries()) {
    const normalizedHeader = normalizeTextCase(header.text);
    if (normalizedHeader.includes(query)) {
      const headerGroup = backTrackHeaders(toc, index);
      const headerStr = headerGroup.map((item2) => item2.text).join(" > ");
      const headerMatchIndex = normalizeTextCase(headerStr).indexOf(query);
      const titlePrefix = `${title} > `;
      matchedResult.push({
        type: "header",
        title: item.title,
        header: `${titlePrefix}${headerStr}`,
        highlightInfoList: [
          {
            start: headerMatchIndex + titlePrefix.length,
            length: getStrByteLength(query)
          }
        ],
        link: `${domain}${normalizeHref2(item.routePath)}#${header.id}`,
        query,
        group: __privateGet(this, _options2).extractGroupName(item.routePath)
      });
      matchHeaderSet.add(header);
    }
  }
  return matchHeaderSet;
};
_matchContent = new WeakSet();
matchContent_fn = function(item, query, matchedResult, matchHeaderSet) {
  var _a, _b, _c;
  const { content, toc, domain } = item;
  if (!content.length) {
    return;
  }
  const normalizedContent = normalizeTextCase(content);
  let queryIndex = normalizedContent.indexOf(query);
  const headersIndex = toc.map((h) => h.charIndex);
  const getCurrentHeader = (currentIndex) => {
    const currentHeaderIndex = headersIndex.findIndex((hIndex, position) => {
      if (position < toc.length - 1) {
        const next = headersIndex[position + 1];
        if (hIndex <= currentIndex && next >= currentIndex) {
          return true;
        }
      } else {
        return hIndex < currentIndex;
      }
      return false;
    });
    return toc[currentHeaderIndex];
  };
  const isHeaderMatched = (header) => header && (matchHeaderSet == null ? void 0 : matchHeaderSet.has(header));
  if (queryIndex === -1) {
    const highlightItems = (_a = item._matchesPosition) == null ? void 0 : _a.content;
    if (!(highlightItems == null ? void 0 : highlightItems.length)) {
      return;
    }
    const highlightStartIndex = item._matchesPosition.content[0].start;
    const currentHeader = getCurrentHeader(highlightStartIndex);
    if (isHeaderMatched(currentHeader)) {
      return;
    }
    const statementStartIndex = byteToCharIndex(content, highlightStartIndex);
    const statementEndIndex = byteToCharIndex(
      content,
      highlightStartIndex + THRESHOLD_CONTENT_LENGTH
    );
    const statement = content.slice(statementStartIndex, statementEndIndex);
    const highlightInfoList = item._matchesPosition.content.filter(
      (match2) => match2.start >= highlightStartIndex && match2.start + match2.length <= highlightStartIndex + THRESHOLD_CONTENT_LENGTH
    ).map((match2) => {
      const startCharIndex = byteToCharIndex(content, match2.start) - statementStartIndex + 3;
      return {
        // prefix `...` length is 3
        start: startCharIndex,
        length: match2.length
      };
    });
    matchedResult.push({
      type: "content",
      title: item.title,
      header: (_b = currentHeader == null ? void 0 : currentHeader.text) != null ? _b : item.title,
      link: `${domain}${normalizeHref2(item.routePath)}${currentHeader ? `#${currentHeader.id}` : ""}`,
      query,
      highlightInfoList,
      group: __privateGet(this, _options2).extractGroupName(item.routePath),
      statement: `...${statement}...`
    });
    return;
  }
  while (queryIndex !== -1) {
    const currentHeader = getCurrentHeader(queryIndex);
    let statementStartIndex = content.slice(0, queryIndex).lastIndexOf("\n");
    statementStartIndex = statementStartIndex === -1 ? 0 : statementStartIndex;
    const statementEndIndex = content.indexOf(
      "\n\n",
      queryIndex + query.length
    );
    let statement = content.slice(statementStartIndex, statementEndIndex);
    if (statement.length > THRESHOLD_CONTENT_LENGTH) {
      statement = __privateMethod(this, _normalizeStatement, normalizeStatement_fn).call(this, statement, query);
    }
    const highlightIndex = normalizeTextCase(statement).indexOf(query);
    const highlightInfoList = [
      {
        start: highlightIndex,
        length: getStrByteLength(query)
      }
    ];
    if (!isHeaderMatched(currentHeader)) {
      matchedResult.push({
        type: "content",
        title: item.title,
        header: (_c = currentHeader == null ? void 0 : currentHeader.text) != null ? _c : item.title,
        statement,
        highlightInfoList,
        link: `${domain}${normalizeHref2(item.routePath)}${currentHeader ? `#${currentHeader.id}` : ""}`,
        query,
        group: __privateGet(this, _options2).extractGroupName(item.routePath)
      });
      currentHeader && (matchHeaderSet == null ? void 0 : matchHeaderSet.add(currentHeader));
    }
    queryIndex = normalizedContent.indexOf(
      query,
      queryIndex + statement.length - highlightIndex
    );
  }
};
_normalizeStatement = new WeakSet();
normalizeStatement_fn = function(statement, query) {
  const queryIndex = normalizeTextCase(statement).indexOf(
    normalizeTextCase(query)
  );
  const maxPrefixOrSuffix = Math.floor(
    (THRESHOLD_CONTENT_LENGTH - query.length) / 2
  );
  let prefix = statement.slice(0, queryIndex);
  if (prefix.length > maxPrefixOrSuffix) {
    prefix = `...${statement.slice(
      queryIndex - maxPrefixOrSuffix + 3,
      queryIndex
    )}`;
  }
  let suffix = statement.slice(queryIndex + query.length);
  if (suffix.length > maxPrefixOrSuffix) {
    suffix = `${statement.slice(
      queryIndex + query.length,
      queryIndex + maxPrefixOrSuffix - 3
    )}...`;
  }
  return prefix + query + suffix;
};
_isCurrentIndex = new WeakSet();
isCurrentIndex_fn = function(index) {
  return index === __privateGet(this, _indexName) || index === LOCAL_INDEX;
};

// src/logic/useFullTextSearch.ts
function useFullTextSearch() {
  var _a;
  const { siteData: siteData3, page } = usePageData5();
  const [initialized, setInitialized] = useState2(false);
  const { sidebar } = useLocaleSiteData();
  const extractGroupName = (link) => getSidebarData(sidebar, link).group;
  const searchRef = useRef2(null);
  useEffect2(() => {
    function init() {
      return __async(this, null, function* () {
        if (!initialized) {
          const searcher = new PageSearcher(__spreadProps(__spreadValues({}, siteData3.search), {
            mode: "local",
            currentLang: page.lang,
            currentVersion: page.version,
            extractGroupName
          }));
          searchRef.current = searcher;
          yield searcher.init();
          setInitialized(true);
        }
      });
    }
    init();
  }, []);
  return {
    initialized,
    search: (_a = searchRef.current) == null ? void 0 : _a.match.bind(searchRef.current)
  };
}

// src/logic/useRedirect4FirstVisit.ts
import { removeBase as removeBase2, usePageData as usePageData6, withBase as withBase4 } from "@rspress/runtime";
import { useEffect as useEffect3 } from "react";
function useRedirect4FirstVisit() {
  const { siteData: siteData3, page } = usePageData6();
  const defaultLang = siteData3.lang || "";
  const localeLanguages = Object.values(siteData3.themeConfig.locales || {});
  const langs = localeLanguages.map((item) => item.lang) || [];
  const currentLang = page.lang;
  useEffect3(() => {
    var _a;
    const localeRedirect = (_a = siteData3.themeConfig.localeRedirect) != null ? _a : "auto";
    if (localeRedirect !== "auto") {
      return;
    }
    if (!defaultLang || process.env.TEST === "1") {
      return;
    }
    const botRegex = /bot|spider|crawl|lighthouse/i;
    if (botRegex.test(window.navigator.userAgent)) {
      return;
    }
    const { pathname, search } = window.location;
    const cleanPathname = removeBase2(pathname);
    const FIRST_VISIT_KEY = "rspress-visited";
    const visited = localStorage.getItem(FIRST_VISIT_KEY);
    if (visited) {
      return;
    }
    localStorage.setItem(FIRST_VISIT_KEY, "1");
    const targetLang = window.navigator.language.split("-")[0];
    if (!langs.includes(targetLang)) {
      return;
    }
    if (targetLang === currentLang) {
      return;
    }
    let newPath;
    if (targetLang === defaultLang) {
      newPath = pathname.replace(`/${currentLang}`, "");
    } else if (currentLang === defaultLang) {
      newPath = withBase4(`/${targetLang}${cleanPathname}`);
    } else {
      newPath = pathname.replace(`/${currentLang}`, `/${targetLang}`);
    }
    if (newPath) {
      window.location.replace(newPath + search);
    }
  }, []);
}

// src/logic/useAppearance.ts
import { APPEARANCE_KEY } from "@rspress/shared";
import { useCallback as useCallback2, useEffect as useEffect6, useState as useState5 } from "react";
import siteData from "virtual-site-data";

// src/logic/useHandler.ts
import { useRef as useRef3 } from "react";
var useHandler = (handler) => {
  const handlerRef = useRef3(handler);
  handlerRef.current = handler;
  return useRef3((...args) => handlerRef.current(...args)).current;
};

// src/logic/useMediaQuery.ts
import { useEffect as useEffect4, useState as useState3 } from "react";
var useMediaQuery = (query) => {
  const [matches, setMatches] = useState3(() => {
    return typeof window !== "undefined" ? window.matchMedia(query).matches : false;
  });
  useEffect4(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (e) => setMatches(e.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);
  return matches;
};

// src/logic/useStorageValue.ts
import { useCallback, useEffect as useEffect5, useState as useState4 } from "react";
var useStorageValue = (key, defaultValue) => {
  const [value, setValueInternal] = useState4(() => {
    var _a;
    if (typeof window === "undefined") {
      return defaultValue;
    }
    return (_a = localStorage.getItem(key)) != null ? _a : defaultValue;
  });
  const setValue = useCallback(
    (value2) => {
      setValueInternal((prev) => {
        const next = typeof value2 === "function" ? value2(prev) : value2;
        if (next == null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, next);
        }
        return next;
      });
    },
    [key]
  );
  useEffect5(() => {
    const listener = (e) => {
      var _a;
      if (e.key === key) {
        setValueInternal((_a = localStorage.getItem(key)) != null ? _a : defaultValue);
      }
    };
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key, defaultValue]);
  return [value, setValue];
};

// src/logic/useAppearance.ts
var sanitize = (value) => {
  return ["light", "dark", "auto"].includes(value) ? value : "auto";
};
var disableDarkMode = siteData.themeConfig.darkMode === false;
var useThemeState = () => {
  const matchesDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [storedTheme, setStoredTheme] = useStorageValue(
    APPEARANCE_KEY,
    "auto"
  );
  const getPreferredTheme = useHandler(() => {
    if (disableDarkMode) {
      return "light";
    }
    const sanitized = sanitize(storedTheme);
    return sanitized === "auto" ? matchesDark ? "dark" : "light" : sanitized;
  });
  const [theme, setThemeInternal] = useState5(() => {
    var _a;
    if (typeof window === "undefined") {
      return "light";
    }
    const defaultTheme = (_a = window.RSPRESS_THEME) != null ? _a : window.MODERN_THEME;
    if (defaultTheme) {
      return defaultTheme === "dark" ? "dark" : "light";
    }
    return getPreferredTheme();
  });
  const setTheme = useCallback2(
    (value, storeValue = value) => {
      if (disableDarkMode) {
        return;
      }
      setThemeInternal(value);
      setStoredTheme(storeValue);
      setSkipEffect(true);
    },
    []
  );
  useEffect6(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  const [skipEffect, setSkipEffect] = useState5(true);
  useEffect6(() => {
    setSkipEffect(false);
  }, [skipEffect]);
  useEffect6(() => {
    if (skipEffect) {
      return;
    }
    setTheme(getPreferredTheme(), sanitize(storedTheme));
  }, [storedTheme]);
  useEffect6(() => {
    if (skipEffect) {
      return;
    }
    setTheme(matchesDark ? "dark" : "light", "auto");
  }, [matchesDark]);
  return [theme, setTheme];
};

// src/logic/utils.ts
import { isEqualPath as isEqualPath3 } from "@rspress/runtime";
import htmr from "htmr";
function isActive(currentPath, targetLink, strict = false) {
  if (!targetLink) {
    return false;
  }
  if (strict) {
    return isEqualPath3(currentPath, targetLink) || isEqualPath3(currentPath, `${targetLink}/index`);
  }
  return isEqualPath3(currentPath, targetLink) || currentPath.startsWith(targetLink);
}
function isMobileDevice() {
  return window.innerWidth <= 1024;
}
function renderHtmlOrText(str) {
  if (!str) {
    return "";
  }
  if (typeof str === "number") {
    return str;
  }
  const hasValidHtmlElements = /<([a-z]+)([^<]*)(?:>(.*?)<\/\1>|\s*\/>)/i.test(
    str
  );
  if (hasValidHtmlElements) {
    return htmr(str);
  }
  return str.replace(/\\</g, "<").replace(/\\>/g, ">").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
var CODE_TEXT_PATTERN = /`(.*?)`/g;
var STRONG_TEXT_PATTERN = /\*{2}(?!\*)(.*?)\*{2}(?!\*)/g;
var EMPHASIS_TEXT_PATTERN = /\*(?!\*)(.*?)\*(?!\*)/g;
var DELETE_TEXT_PATTERN = /\~{2}(.*?)\~{2}/g;
function renderInlineMarkdown(text) {
  const htmlText = text.replace(/`[^`]+`/g, (match2) => match2.replace(/</g, "&lt;")).replace(STRONG_TEXT_PATTERN, "<strong>$1</strong>").replace(EMPHASIS_TEXT_PATTERN, "<em>$1</em>").replace(DELETE_TEXT_PATTERN, "<del>$1</del>").replace(CODE_TEXT_PATTERN, "<code>$1</code>");
  return renderHtmlOrText(htmlText);
}
function parseInlineMarkdownText(mdx) {
  return mdx.replace(STRONG_TEXT_PATTERN, "$1").replace(EMPHASIS_TEXT_PATTERN, "$1").replace(DELETE_TEXT_PATTERN, "$1").replace(CODE_TEXT_PATTERN, "$1");
}

// src/components/Aside/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Aside(props) {
  var _a;
  const { headers } = props;
  const hasOutline = headers.length > 0;
  const baseHeaderLevel = ((_a = headers[0]) == null ? void 0 : _a.depth) || 2;
  const hiddenNav = useHiddenNav();
  useEffect7(() => {
    let unbinding;
    setTimeout(() => {
      unbinding = bindingAsideScroll();
    }, 100);
    const hash = decodeURIComponent(window.location.hash);
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        scrollToTarget(target, false, hiddenNav ? 0 : DEFAULT_NAV_HEIGHT);
      }
    }
    return () => {
      if (unbinding) {
        unbinding();
      }
    };
  }, [headers]);
  const renderHeader = (header) => {
    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
      "a",
      {
        href: `#${header.id}`,
        title: parseInlineMarkdownText(header.text),
        className: "aside-link transition-all duration-300 hover:text-text-1 text-text-2 block",
        style: {
          marginLeft: (header.depth - baseHeaderLevel) * 12,
          fontWeight: "semibold"
        },
        onClick: (e) => {
          e.preventDefault();
          window.location.hash = header.id;
          const target = document.getElementById(header.id);
          if (target) {
            scrollToTarget(target, false, hiddenNav ? 0 : DEFAULT_NAV_HEIGHT);
          }
        },
        children: /* @__PURE__ */ jsx("span", { className: "aside-link-text block", children: renderInlineMarkdown(header.text) })
      }
    ) }, header.id);
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx("div", { className: hasOutline ? "<lg:hidden" : "hidden", children: /* @__PURE__ */ jsxs("div", { id: "aside-container", className: "relative text-sm font-medium", children: [
    /* @__PURE__ */ jsx("div", { className: "leading-7 block text-sm font-semibold pl-3", children: props.outlineTitle }),
    /* @__PURE__ */ jsx("nav", { className: "mt-1", children: /* @__PURE__ */ jsx("ul", { className: "relative", children: headers.map(renderHeader) }) })
  ] }) }) });
}

// src/components/DocFooter/index.tsx
import {
  normalizeHrefInRuntime as normalizeHref3,
  usePageData as usePageData7
} from "@rspress/runtime";
import { EditLink, LastUpdated, PrevNextPage } from "@theme";

// src/components/DocFooter/index.module.scss
var index_module_default = { "pager": "pager_e7091", "has-next": "has-next_e7091", "hasNext": "has-next_e7091", "prev": "prev_e7091", "next": "next_e7091" };

// src/components/DocFooter/index.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function DocFooter() {
  const { prevPage, nextPage } = usePrevNextPage();
  const { lastUpdated: localesLastUpdated = false } = useLocaleSiteData();
  const { siteData: siteData3 } = usePageData7();
  const { themeConfig } = siteData3;
  const showLastUpdated = themeConfig.lastUpdated || localesLastUpdated;
  return /* @__PURE__ */ jsxs2("footer", { className: "mt-8", children: [
    /* @__PURE__ */ jsx2("div", { className: "xs:flex pb-5 px-2 justify-end items-center", children: showLastUpdated && /* @__PURE__ */ jsx2(LastUpdated, {}) }),
    /* @__PURE__ */ jsx2("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx2(EditLink, {}) }),
    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col sm:flex-row sm:justify-around gap-4 pt-6", children: [
      /* @__PURE__ */ jsx2("div", { className: `${index_module_default.prev} flex flex-col`, children: prevPage ? /* @__PURE__ */ jsx2(
        PrevNextPage,
        {
          type: "prev",
          text: prevPage.text,
          href: normalizeHref3(prevPage.link)
        }
      ) : null }),
      /* @__PURE__ */ jsx2("div", { className: `${index_module_default.next} flex flex-col`, children: nextPage ? /* @__PURE__ */ jsx2(
        PrevNextPage,
        {
          type: "next",
          text: nextPage.text,
          href: normalizeHref3(nextPage.link)
        }
      ) : null })
    ] })
  ] });
}

// src/components/LocalSideBar/index.tsx
import { useLocation as useLocation4 } from "@rspress/runtime";
import { Sidebar, Toc } from "@theme";
import ArrowRight from "@theme-assets/arrow-right";
import MenuIcon from "@theme-assets/menu";
import { Fragment, useEffect as useEffect8, useRef as useRef4, useState as useState6 } from "react";

// src/components/SvgWrapper/index.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function SvgWrapper(_a) {
  var _b = _a, {
    icon: Icon
  } = _b, rest = __objRest(_b, [
    "icon"
  ]);
  if (!Icon) {
    return null;
  }
  if (typeof Icon === "string") {
    return /* @__PURE__ */ jsx3("img", __spreadValues({ src: Icon, alt: "" }, rest));
  }
  return /* @__PURE__ */ jsx3(Icon, __spreadValues({}, rest));
}

// src/components/LocalSideBar/index.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function SideMenu({
  outlineTitle,
  beforeSidebar,
  afterSidebar,
  uiSwitch,
  navTitle
}) {
  const [isSidebarOpen, setSidebarIsOpen] = useState6(false);
  const [isTocOpen, setIsTocOpen] = useState6(false);
  const tocContainerRef = useRef4(null);
  const outlineButtonRef = useRef4(null);
  const { pathname } = useLocation4();
  function openSidebar() {
    setSidebarIsOpen(true);
  }
  function closeSidebar() {
    setSidebarIsOpen(false);
  }
  useEffect8(() => {
    setSidebarIsOpen(false);
  }, [pathname]);
  useEffect8(() => {
    document.addEventListener("mouseup", handleClickOutsideForToc);
    document.addEventListener("touchend", handleClickOutsideForToc);
    return () => {
      document.addEventListener("mouseup", handleClickOutsideForToc);
      document.removeEventListener("touchend", handleClickOutsideForToc);
    };
  }, []);
  const handleClickOutsideForToc = (e) => {
    const { current: outlineButton } = outlineButtonRef;
    if (outlineButton == null ? void 0 : outlineButton.contains(e.target)) {
      return;
    }
    const { current: tocContainer } = tocContainerRef;
    if (tocContainer && !tocContainer.contains(e.target)) {
      setIsTocOpen(false);
    }
  };
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3("div", { className: "rspress-sidebar-menu", children: [
      (uiSwitch == null ? void 0 : uiSwitch.showSidebar) ? /* @__PURE__ */ jsxs3("button", { onClick: openSidebar, className: "flex-center mr-auto", children: [
        /* @__PURE__ */ jsx4("div", { className: "text-md mr-2", children: /* @__PURE__ */ jsx4(SvgWrapper, { icon: MenuIcon }) }),
        /* @__PURE__ */ jsx4("span", { className: "text-sm", children: "Menu" })
      ] }) : null,
      (uiSwitch == null ? void 0 : uiSwitch.showAside) ? /* @__PURE__ */ jsxs3(Fragment, { children: [
        /* @__PURE__ */ jsxs3(
          "button",
          {
            onClick: () => setIsTocOpen((tocOpened) => !tocOpened),
            className: "flex-center ml-auto",
            ref: outlineButtonRef,
            children: [
              /* @__PURE__ */ jsx4("span", { className: "text-sm", children: outlineTitle }),
              /* @__PURE__ */ jsx4(
                "div",
                {
                  className: "text-md mr-2",
                  style: {
                    transform: isTocOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease-out",
                    marginTop: "2px"
                  },
                  children: /* @__PURE__ */ jsx4(SvgWrapper, { icon: ArrowRight })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx4(
          "div",
          {
            className: `rspress-local-toc-container ${isTocOpen ? "rspress-local-toc-container-show" : ""}`,
            children: /* @__PURE__ */ jsx4(
              Toc,
              {
                onItemClick: () => {
                  setIsTocOpen(false);
                }
              }
            )
          }
        )
      ] }) : null
    ] }),
    (uiSwitch == null ? void 0 : uiSwitch.showSidebar) ? /* @__PURE__ */ jsxs3(Fragment, { children: [
      /* @__PURE__ */ jsx4(
        Sidebar,
        {
          isSidebarOpen,
          beforeSidebar,
          afterSidebar,
          uiSwitch,
          navTitle
        }
      ),
      isSidebarOpen ? /* @__PURE__ */ jsx4(
        "div",
        {
          onClick: closeSidebar,
          className: "rspress-sidebar-back-drop",
          style: {
            background: "rgba(0, 0, 0, 0.6)"
          }
        }
      ) : null
    ] }) : null
  ] });
}

// src/logic/TabDataContext.ts
import { createContext } from "react";
var TabDataContext = createContext({
  tabData: {},
  setTabData: () => {
  }
});

// src/layout/DocLayout/docComponents/link.tsx
import { Link } from "@theme";

// src/layout/DocLayout/docComponents/index.module.scss
var index_module_default2 = { "title": "title_3b154", "blockquote": "blockquote_3b154", "link": "link_3b154", "inline-link": "inline-link_3b154", "inlineLink": "inline-link_3b154" };

// src/layout/DocLayout/docComponents/link.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var A = (props) => {
  const { href = "", className = "" } = props;
  const { normalizeLinkHref } = usePathUtils();
  const hasHeaderAnchor = className.includes("header-anchor");
  if (hasHeaderAnchor || href.startsWith("#")) {
    return /* @__PURE__ */ jsx5("a", __spreadProps(__spreadValues({}, props), { className: `${index_module_default2.link} ${className}` }));
  }
  return /* @__PURE__ */ jsx5(
    Link,
    __spreadProps(__spreadValues({}, props), {
      className: `${className} ${index_module_default2.link} ${index_module_default2["inline-link"]}`,
      href: normalizeLinkHref(href)
    })
  );
};

// src/layout/DocLayout/docComponents/title.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var H1 = (props) => {
  return /* @__PURE__ */ jsx6(
    "h1",
    __spreadProps(__spreadValues({}, props), {
      className: `rspress-doc-title text-3xl mb-10 leading-10 tracking-tight ${index_module_default2.title}`
    })
  );
};
var H2 = (props) => {
  return /* @__PURE__ */ jsx6(
    "h2",
    __spreadProps(__spreadValues({}, props), {
      className: `mt-12 mb-6 pt-8 text-2xl tracking-tight border-t-[1px] border-divider-light ${index_module_default2.title}`
    })
  );
};
var H3 = (props) => {
  return /* @__PURE__ */ jsx6("h3", __spreadProps(__spreadValues({}, props), { className: `mt-10 mb-2 leading-7 text-xl ${index_module_default2.title}` }));
};
var H4 = (props) => {
  return /* @__PURE__ */ jsx6("h4", __spreadProps(__spreadValues({}, props), { className: `mt-8 leading-6 text-lg ${index_module_default2.title}` }));
};
var H5 = (props) => {
  return /* @__PURE__ */ jsx6("h5", __spreadProps(__spreadValues({}, props), { className: index_module_default2.title }));
};
var H6 = (props) => {
  return /* @__PURE__ */ jsx6("h6", __spreadProps(__spreadValues({}, props), { className: index_module_default2.title }));
};

// src/layout/DocLayout/index.module.scss
var index_module_default3 = { "aside-container": "aside-container_edeb4", "asideContainer": "aside-container_edeb4", "fade-out": "fade-out_edeb4", "fadeOut": "fade-out_edeb4", "fade-in": "fade-in_edeb4", "fadeIn": "fade-in_edeb4", "docLayout": "docLayout_edeb4", "content": "content_edeb4" };

// src/layout/DocLayout/index.tsx
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function DocLayout(props) {
  var _a, _b;
  const {
    beforeDocFooter,
    afterDocFooter,
    beforeDoc,
    afterDoc,
    beforeDocContent,
    afterDocContent,
    beforeOutline,
    afterOutline,
    beforeSidebar,
    afterSidebar,
    uiSwitch,
    navTitle,
    components
  } = props;
  const { siteData: siteData3, page } = usePageData8();
  const { headingTitle, title, toc = [], frontmatter } = page;
  const [tabData, setTabData] = useState7({});
  const headers = toc;
  const { themeConfig } = siteData3;
  const enableScrollToTop = (_a = themeConfig.enableScrollToTop) != null ? _a : false;
  const localesData = useLocaleSiteData();
  const outlineTitle = (localesData == null ? void 0 : localesData.outlineTitle) || (themeConfig == null ? void 0 : themeConfig.outlineTitle) || "ON THIS PAGE";
  const isOverviewPage = (_b = frontmatter == null ? void 0 : frontmatter.overview) != null ? _b : false;
  const mdxComponents = __spreadValues(__spreadValues({}, getCustomMDXComponent()), components);
  const docContent = /* @__PURE__ */ jsx7(TabDataContext.Provider, { value: { tabData, setTabData }, children: /* @__PURE__ */ jsx7(MDXProvider, { components: mdxComponents, children: /* @__PURE__ */ jsx7(Content, {}) }) });
  const fallbackTitle = useMemo2(() => {
    const titleSlug = title && slug(title);
    return siteData3.themeConfig.fallbackHeadingTitle !== false && !headingTitle && titleSlug && /* @__PURE__ */ jsxs4(H1, { id: titleSlug, children: [
      title,
      /* @__PURE__ */ jsx7(A, { className: "header-anchor", href: `#${titleSlug}`, "aria-hidden": true, children: "#" })
    ] });
  }, [headingTitle, title]);
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      className: `${index_module_default3.docLayout} pt-0`,
      style: __spreadValues({}, (uiSwitch == null ? void 0 : uiSwitch.showNavbar) ? {} : { marginTop: 0 }),
      children: [
        beforeDoc,
        /* @__PURE__ */ jsx7(
          SideMenu,
          {
            outlineTitle,
            beforeSidebar,
            afterSidebar,
            uiSwitch,
            navTitle
          }
        ),
        /* @__PURE__ */ jsxs4(
          "div",
          {
            className: `${index_module_default3.content} rspress-doc-container flex flex-shrink-0 mx-auto`,
            children: [
              /* @__PURE__ */ jsx7("div", { className: "w-full flex-1", children: isOverviewPage ? /* @__PURE__ */ jsxs4(Fragment2, { children: [
                beforeDocContent,
                /* @__PURE__ */ jsx7(Overview, { content: docContent }),
                afterDocContent
              ] }) : /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsxs4("div", { className: "rspress-doc", children: [
                  beforeDocContent,
                  fallbackTitle,
                  docContent,
                  afterDocContent
                ] }),
                /* @__PURE__ */ jsxs4("div", { className: "rspress-doc-footer", children: [
                  beforeDocFooter,
                  (uiSwitch == null ? void 0 : uiSwitch.showDocFooter) && /* @__PURE__ */ jsx7(DocFooter, {}),
                  afterDocFooter
                ] })
              ] }) }),
              enableScrollToTop && /* @__PURE__ */ jsx7(NoSSR, { children: /* @__PURE__ */ jsx7(ScrollToTop, {}) }),
              (uiSwitch == null ? void 0 : uiSwitch.showAside) ? /* @__PURE__ */ jsx7(
                "div",
                {
                  className: index_module_default3.asideContainer,
                  style: __spreadValues({}, (uiSwitch == null ? void 0 : uiSwitch.showNavbar) ? {} : {
                    marginTop: 0,
                    paddingTop: "32px"
                  }),
                  children: /* @__PURE__ */ jsxs4("div", { children: [
                    beforeOutline,
                    /* @__PURE__ */ jsx7(Aside, { headers, outlineTitle }),
                    afterOutline
                  ] })
                }
              ) : null
            ]
          }
        ),
        afterDoc
      ]
    }
  );
}

// src/layout/HomeLayout/index.tsx
import { usePageData as usePageData9 } from "@rspress/runtime";
import { HomeFeature, HomeFooter, HomeHero } from "@theme";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
function HomeLayout(props) {
  const { beforeHero, afterHero, beforeFeatures, afterFeatures } = props;
  const {
    page: { frontmatter, routePath }
  } = usePageData9();
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      className: "relative",
      style: {
        minHeight: "calc(100vh - var(--rp-nav-height))",
        paddingBottom: "80px"
      },
      children: [
        /* @__PURE__ */ jsxs5("div", { className: "pb-12", children: [
          beforeHero,
          /* @__PURE__ */ jsx8(HomeHero, { frontmatter, routePath }),
          afterHero,
          beforeFeatures,
          /* @__PURE__ */ jsx8(HomeFeature, { frontmatter, routePath }),
          afterFeatures
        ] }),
        /* @__PURE__ */ jsx8(HomeFooter, {})
      ]
    }
  );
}

// src/layout/Layout/index.tsx
import "nprogress/nprogress.css";
import { Content as Content2, usePageData as usePageData11 } from "@rspress/runtime";
import Theme, { Nav } from "@theme";
import { Helmet } from "react-helmet-async";

// src/logic/useUISwitch.ts
import { useLocation as useLocation5, usePageData as usePageData10 } from "@rspress/runtime";
import { inBrowser as inBrowser2 } from "@rspress/shared";
import { useEffect as useEffect9, useState as useState8 } from "react";
function useUISwitch() {
  var _a, _b;
  const { page, siteData: siteData3 } = usePageData10();
  const { frontmatter } = page;
  const { themeConfig } = siteData3;
  const localesData = useLocaleSiteData();
  const location2 = useLocation5();
  const isOverviewPage = (_a = frontmatter == null ? void 0 : frontmatter.overview) != null ? _a : false;
  const getShowAside = () => {
    var _a2, _b2;
    const defaultHasAside = typeof window === "undefined" ? true : window.top === window.self;
    return ((_b2 = (_a2 = frontmatter == null ? void 0 : frontmatter.outline) != null ? _a2 : themeConfig == null ? void 0 : themeConfig.outline) != null ? _b2 : defaultHasAside) && !isOverviewPage;
  };
  const [showNavbar, setShowNavbar] = useEnableNav();
  const [showAside, setShowAside] = useState8(getShowAside());
  const [showDocFooter, setShowDocFooter] = useState8(
    (_b = frontmatter == null ? void 0 : frontmatter.footer) != null ? _b : true
  );
  const sidebar = localesData.sidebar || {};
  const showSidebar = (frontmatter == null ? void 0 : frontmatter.sidebar) !== false && Object.keys(sidebar).length > 0;
  useEffect9(() => {
    setShowAside(getShowAside());
  }, [page, siteData3]);
  useEffect9(() => {
    const query = new URLSearchParams(location2.search);
    const documentStyle = document.documentElement.style;
    const originalSidebarWidth = documentStyle.getPropertyValue("--rp-sidebar-width");
    const originalAsideWidth = documentStyle.getPropertyValue("--rp-aside-width");
    const originNavbar = showNavbar;
    const originDocFooter = showDocFooter;
    const navbar = query.get("navbar");
    const sidebar2 = query.get("sidebar");
    const aside = query.get("outline");
    const footer = query.get("footer");
    if (navbar === "0" /* Hide */) {
      setShowNavbar(false);
    }
    if (sidebar2 === "0" /* Hide */) {
      document.documentElement.style.setProperty("--rp-sidebar-width", "0px");
    }
    if (aside === "0" /* Hide */) {
      document.documentElement.style.setProperty("--rp-aside-width", "0px");
    }
    if (footer === "0" /* Hide */) {
      setShowDocFooter(false);
    }
    return () => {
      document.documentElement.style.setProperty(
        "--rp-sidebar-width",
        originalSidebarWidth
      );
      document.documentElement.style.setProperty(
        "--rp-aside-width",
        originalAsideWidth
      );
      setShowNavbar(originNavbar);
      setShowDocFooter(originDocFooter);
    };
  }, [location2.search]);
  useEffect9(() => {
    if (inBrowser2() && history.scrollRestoration) {
      history.scrollRestoration = location2.hash.length ? "manual" : "auto";
    }
  }, [!location2.hash.length]);
  return {
    showAside,
    showNavbar,
    showSidebar,
    showDocFooter
  };
}

// src/layout/Layout/index.tsx
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var concatTitle = (title, suffix) => {
  if (!suffix) {
    return title;
  }
  title = title.trim();
  suffix = suffix.trim();
  if (!suffix.startsWith("-") && !suffix.startsWith("|")) {
    return `${title} - ${suffix}`;
  }
  return `${title} ${suffix}`;
};
var Layout = (props) => {
  var _a;
  const {
    top,
    bottom,
    beforeDocFooter,
    afterDocFooter,
    beforeDoc,
    afterDoc,
    beforeDocContent,
    afterDocContent,
    beforeSidebar,
    afterSidebar,
    beforeOutline,
    afterOutline,
    beforeNavTitle,
    afterNavTitle,
    navTitle,
    beforeNav,
    beforeHero,
    afterHero,
    beforeFeatures,
    afterFeatures,
    afterNavMenu,
    components
  } = props;
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
  const { siteData: siteData3, page } = usePageData11();
  const {
    pageType,
    lang: currentLang,
    // Inject by remark-plugin-toc
    title: articleTitle,
    frontmatter = {}
  } = page;
  const localesData = useLocaleSiteData();
  useRedirect4FirstVisit();
  let title = (_a = frontmatter.title) != null ? _a : articleTitle;
  const mainTitle = siteData3.title || localesData.title || "";
  if (title && pageType === "doc") {
    title = concatTitle(
      title,
      frontmatter.titleSuffix || mainTitle
    );
  } else if (pageType === "home") {
    title = concatTitle(mainTitle, frontmatter.titleSuffix);
  } else if (pageType === "404") {
    title = concatTitle("404", mainTitle);
  } else {
    title = mainTitle;
  }
  const description = (frontmatter == null ? void 0 : frontmatter.description) || siteData3.description || localesData.description;
  const uiSwitch = __spreadValues(__spreadValues({}, useUISwitch()), props.uiSwitch);
  const getContentLayout = () => {
    switch (pageType) {
      case "home":
        return /* @__PURE__ */ jsx9(Theme.HomeLayout, __spreadValues({}, homeProps));
      case "doc":
        return /* @__PURE__ */ jsx9(DocLayout, __spreadProps(__spreadValues({}, docProps), { uiSwitch, navTitle }));
      case "404":
        return /* @__PURE__ */ jsx9(Theme.NotFoundLayout, {});
      case "custom":
      case "blank":
        return /* @__PURE__ */ jsx9(Content2, {});
      default:
        return /* @__PURE__ */ jsx9(DocLayout, __spreadValues({}, docProps));
    }
  };
  return /* @__PURE__ */ jsxs6("div", { children: [
    /* @__PURE__ */ jsxs6(
      Helmet,
      {
        htmlAttributes: {
          lang: currentLang || "en"
        },
        children: [
          title ? /* @__PURE__ */ jsx9("title", { children: title }) : null,
          description ? /* @__PURE__ */ jsx9("meta", { name: "description", content: description }) : null
        ]
      }
    ),
    top,
    pageType !== "blank" && uiSwitch.showNavbar && /* @__PURE__ */ jsx9(
      Nav,
      {
        beforeNavTitle,
        afterNavTitle,
        navTitle,
        beforeNav,
        afterNavMenu
      }
    ),
    /* @__PURE__ */ jsx9("section", { children: getContentLayout() }),
    bottom
  ] });
};

// src/layout/NotFountLayout/index.tsx
import { usePageData as usePageData12, withBase as withBase5 } from "@rspress/runtime";
import { Fragment as Fragment3, jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
function NotFoundLayout() {
  const { siteData: siteData3, page } = usePageData12();
  const defaultLang = siteData3.lang;
  const defaultVersion = siteData3.multiVersion.default;
  if (defaultLang && typeof window !== "undefined" && location.pathname.includes(`/${defaultLang}/`)) {
    const redirectUrl = location.pathname.replace(`/${defaultLang}/`, "/");
    window.location.replace(redirectUrl);
    return /* @__PURE__ */ jsx10(Fragment3, {});
  }
  let root = "/";
  if (defaultVersion && page.version !== defaultVersion) {
    root += `${page.version}/`;
  }
  if (defaultLang && page.lang !== defaultLang) {
    root += `${page.lang}/`;
  }
  return /* @__PURE__ */ jsxs7("div", { className: "m-auto mt-50 p-16 sm:p-8 sm:pt-24 sm:pb-40 text-center flex-center flex-col", children: [
    /* @__PURE__ */ jsx10("p", { className: "text-6xl font-semibold", children: "404" }),
    /* @__PURE__ */ jsx10("h1", { className: "leading-5 pt-3 text-xl font-bold", children: "PAGE NOT FOUND" }),
    /* @__PURE__ */ jsx10(
      "div",
      {
        style: { height: "1px" },
        className: "mt-6 mx-auto mb-4.5 w-16 bg-gray-light-1"
      }
    ),
    /* @__PURE__ */ jsx10("div", { className: "pt-5", children: /* @__PURE__ */ jsx10(
      "a",
      {
        className: "py-2 px-4 rounded-2xl inline-block border-solid border-brand text-brand font-medium hover:border-brand-dark hover:text-brand-dark transition-colors duration-300",
        href: withBase5(root),
        "aria-label": "go to home",
        children: "Take me home"
      }
    ) })
  ] });
}

// src/layout/DocLayout/docComponents/code/index.tsx
import { usePageData as usePageData14 } from "@rspress/runtime";
import IconWrap from "@theme-assets/wrap";
import IconWrapped from "@theme-assets/wrapped";
import { useRef as useRef6, useState as useState9 } from "react";

// src/layout/DocLayout/docComponents/code/CopyCodeButton.tsx
import IconCopy from "@theme-assets/copy";
import IconSuccess from "@theme-assets/success";
import copy from "copy-to-clipboard";
import { useRef as useRef5 } from "react";

// src/layout/DocLayout/docComponents/code/index.module.scss
var index_module_default4 = { "code-button-group": "code-button-group_15153", "codeButtonGroup": "code-button-group_15153", "code-copy-button": "code-copy-button_15153", "codeCopyButton": "code-copy-button_15153", "icon-success": "icon-success_15153", "iconSuccess": "icon-success_15153", "code-copied": "code-copied_15153", "codeCopied": "code-copied_15153", "icon-copy": "icon-copy_15153", "iconCopy": "icon-copy_15153", "icon-wrapped": "icon-wrapped_15153", "iconWrapped": "icon-wrapped_15153", "wrapped-btn": "wrapped-btn_15153", "wrappedBtn": "wrapped-btn_15153", "icon-wrap": "icon-wrap_15153", "iconWrap": "icon-wrap_15153" };

// src/layout/DocLayout/docComponents/code/CopyCodeButton.tsx
import { jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
var timeoutIdMap = /* @__PURE__ */ new Map();
function copyCode(codeBlockElement, copyButtonElement) {
  let text = "";
  if (!codeBlockElement) {
    return;
  }
  const walk = document.createTreeWalker(
    codeBlockElement,
    NodeFilter.SHOW_TEXT,
    null
  );
  let node = walk.nextNode();
  while (node) {
    if (!node.parentElement.classList.contains("linenumber")) {
      text += node.nodeValue;
    }
    node = walk.nextNode();
  }
  const isCopied = copy(text);
  if (isCopied && copyButtonElement) {
    copyButtonElement.classList.add(index_module_default4.codeCopied);
    clearTimeout(timeoutIdMap.get(copyButtonElement));
    const timeoutId = setTimeout(() => {
      copyButtonElement.classList.remove(index_module_default4.codeCopied);
      copyButtonElement.blur();
      timeoutIdMap.delete(copyButtonElement);
    }, 2e3);
    timeoutIdMap.set(copyButtonElement, timeoutId);
  }
}
function CopyCodeButton({
  codeBlockRef
}) {
  const copyButtonRef = useRef5(null);
  return /* @__PURE__ */ jsxs8(
    "button",
    {
      className: index_module_default4.codeCopyButton,
      onClick: () => copyCode(codeBlockRef.current, copyButtonRef.current),
      ref: copyButtonRef,
      title: "Copy code",
      children: [
        /* @__PURE__ */ jsx11(SvgWrapper, { icon: IconCopy, className: index_module_default4.iconCopy }),
        /* @__PURE__ */ jsx11(SvgWrapper, { icon: IconSuccess, className: index_module_default4.iconSuccess })
      ]
    }
  );
}

// src/layout/DocLayout/docComponents/code/PrismSyntaxHighlighter.tsx
import { usePageData as usePageData13 } from "@rspress/runtime";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { aliases, languages } from "virtual-prism-languages";

// src/layout/DocLayout/docComponents/prism-theme.ts
var prism_theme_default = {
  doctype: {
    color: "var(--code-token-text)",
    fontStyle: "italic"
  },
  token: {
    color: "var(--code-token-text)"
  },
  comment: {
    color: "var(--code-token-comment)"
  },
  punctuation: {
    color: "var(--code-token-punctuation)"
  },
  property: {
    color: "var(--code-token-parameter)"
  },
  constant: {
    color: "var(--code-token-constant)"
  },
  string: {
    color: "var(--code-token-string)"
  },
  symbol: {
    color: "var(--code-token-symbol)"
  },
  variable: {
    color: "var(--code-token-variable)"
  },
  "attr-name": {
    color: "var(--code-token-symbol)"
  },
  "attr-value": {
    color: "var(--code-token-string-expression)"
  },
  builtin: {
    color: "var(--code-token-symbol)"
  },
  function: {
    color: "var(--code-token-function)"
  },
  keyword: {
    color: "var(--code-token-keyword)"
  },
  tag: {
    color: "var(--code-token-function)"
  },
  inserted: {
    color: "var(--code-token-inserted)"
  },
  deleted: {
    color: "var(--code-token-deleted)"
  },
  regex: {
    color: "var(--code-token-keyword)"
  },
  key: {
    color: "var(--code-token-variable)"
  },
  title: {
    color: "var(--code-token-keyword)"
  },
  important: {
    color: "#EBCB8B",
    fontWeight: "bold"
  },
  bold: {
    fontWeight: "bold"
  },
  italic: {
    fontStyle: "italic"
  },
  table: {
    display: "content"
  }
};

// src/layout/DocLayout/docComponents/code/PrismSyntaxHighlighter.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var registered = false;
function registerLanguages() {
  Object.keys(languages).forEach((name) => {
    SyntaxHighlighter.registerLanguage(name, languages[name]);
  });
  SyntaxHighlighter.alias(aliases);
  registered = true;
}
function PrismSyntaxHighlighter(props) {
  var _a;
  const { siteData: siteData3 } = usePageData13();
  const { meta, language, codeWrap } = props;
  const { showLineNumbers } = siteData3.markdown;
  let highlightMeta = "";
  let highlightLines = [];
  if (meta) {
    const highlightReg = /{[\d,-]*}/i;
    highlightMeta = ((_a = highlightReg.exec(meta)) == null ? void 0 : _a[0]) || "";
    if (highlightMeta) {
      highlightLines = highlightMeta.replace(/[{}]/g, "").split(",").map((item) => {
        const [start, end] = item.split("-");
        if (end) {
          return Array.from(
            { length: Number(end) - Number(start) + 1 },
            (_, i) => i + Number(start)
          );
        }
        return Number(start);
      }).flat();
    }
  }
  if (!registered) {
    registerLanguages();
  }
  return /* @__PURE__ */ jsx12(
    SyntaxHighlighter,
    {
      language,
      style: prism_theme_default,
      wrapLines: true,
      className: "code",
      wrapLongLines: codeWrap,
      customStyle: { backgroundColor: "inherit" },
      showLineNumbers: showLineNumbers || highlightLines.length > 0,
      lineProps: (lineNumber) => {
        const isHighlighted = highlightLines.includes(lineNumber);
        return {
          style: __spreadProps(__spreadValues({}, isHighlighted ? { backgroundColor: "var(--rp-code-line-highlight-color)" } : {}), {
            display: "block",
            padding: "0 1.25rem"
          })
        };
      },
      children: String(props.children).trim()
    }
  );
}

// src/layout/DocLayout/docComponents/code/index.tsx
import { Fragment as Fragment4, jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
function Code(props) {
  var _a;
  const { siteData: siteData3 } = usePageData14();
  const codeHighlighter = (_a = props.codeHighlighter) != null ? _a : siteData3.markdown.codeHighlighter;
  const { defaultWrapCode } = siteData3.markdown;
  const [codeWrap, setCodeWrap] = useState9(defaultWrapCode);
  const wrapButtonRef = useRef6(null);
  const codeBlockRef = useRef6(null);
  const { className } = props;
  const language = className == null ? void 0 : className.replace(/language-/, "");
  if (!language) {
    return /* @__PURE__ */ jsx13("code", __spreadValues({}, props));
  }
  const toggleCodeWrap = (wrapButtonElement) => {
    if (codeWrap) {
      wrapButtonElement == null ? void 0 : wrapButtonElement.classList.remove(index_module_default4.wrappedBtn);
    } else {
      wrapButtonElement == null ? void 0 : wrapButtonElement.classList.add(index_module_default4.wrappedBtn);
    }
    setCodeWrap(!codeWrap);
  };
  const getHighlighter = () => {
    switch (codeHighlighter) {
      case "prism":
        return /* @__PURE__ */ jsx13(
          PrismSyntaxHighlighter,
          __spreadProps(__spreadValues({}, props), {
            language,
            codeWrap
          })
        );
      case "shiki":
      default:
        return /* @__PURE__ */ jsx13("pre", __spreadProps(__spreadValues({}, props), { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsx13("code", { style: { whiteSpace: codeWrap ? "pre-wrap" : "pre" }, children: props.children }) }));
    }
  };
  return /* @__PURE__ */ jsxs9(Fragment4, { children: [
    /* @__PURE__ */ jsx13("div", { ref: codeBlockRef, children: getHighlighter() }),
    /* @__PURE__ */ jsxs9("div", { className: index_module_default4.codeButtonGroup, children: [
      /* @__PURE__ */ jsxs9(
        "button",
        {
          ref: wrapButtonRef,
          className: index_module_default4.codeWrapButton,
          onClick: () => toggleCodeWrap(wrapButtonRef.current),
          title: "Toggle code wrap",
          children: [
            /* @__PURE__ */ jsx13(SvgWrapper, { icon: IconWrapped, className: index_module_default4.iconWrapped }),
            /* @__PURE__ */ jsx13(SvgWrapper, { icon: IconWrap, className: index_module_default4.iconWrap })
          ]
        }
      ),
      /* @__PURE__ */ jsx13(CopyCodeButton, { codeBlockRef })
    ] })
  ] });
}

// src/layout/DocLayout/docComponents/hr.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
var Hr = (props) => {
  return /* @__PURE__ */ jsx14(
    "hr",
    __spreadProps(__spreadValues({}, props), {
      className: "my-12 border-t border-solid border-divider-light"
    })
  );
};

// src/layout/DocLayout/docComponents/img.tsx
import { normalizeImagePath } from "@rspress/runtime";
import { jsx as jsx15 } from "react/jsx-runtime";
var Img = (props) => {
  return /* @__PURE__ */ jsx15("img", __spreadProps(__spreadValues({}, props), { src: normalizeImagePath(props.src || "") }));
};

// src/layout/DocLayout/docComponents/list.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
var Ol = (props) => {
  return /* @__PURE__ */ jsx16("ol", __spreadProps(__spreadValues({}, props), { className: "list-decimal pl-5 my-4 leading-7" }));
};
var Ul = (props) => {
  return /* @__PURE__ */ jsx16("ul", __spreadProps(__spreadValues({}, props), { className: "list-disc pl-5 my-4 leading-7" }));
};
var Li = (props) => {
  return /* @__PURE__ */ jsx16("li", __spreadProps(__spreadValues({}, props), { className: "[&:not(:first-child)]:mt-2" }));
};

// src/layout/DocLayout/docComponents/paragraph.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var P = (props) => {
  return /* @__PURE__ */ jsx17("p", __spreadProps(__spreadValues({}, props), { className: "my-4 leading-7" }));
};
var Blockquote = (props) => {
  return /* @__PURE__ */ jsx17(
    "blockquote",
    __spreadProps(__spreadValues({}, props), {
      className: `border-l-2 border-solid border-divider pl-4 my-6 transition-colors duration-500 ${index_module_default2.blockquote}`
    })
  );
};
var Strong = (props) => {
  return /* @__PURE__ */ jsx17("strong", __spreadProps(__spreadValues({}, props), { className: "font-semibold" }));
};

// src/layout/DocLayout/docComponents/pre.tsx
import { jsx as jsx18, jsxs as jsxs10 } from "react/jsx-runtime";
var DEFAULT_LANGUAGE_CLASS = "language-bash";
function parseTitleFromMeta(meta) {
  var _a, _b;
  if (!meta) {
    return "";
  }
  let result = meta;
  const highlightReg = /{[\d,-]*}/i;
  const highlightMeta = (_a = highlightReg.exec(meta)) == null ? void 0 : _a[0];
  if (highlightMeta) {
    result = meta.replace(highlightReg, "").trim();
  }
  result = (_b = result.split("=")[1]) != null ? _b : "";
  return result == null ? void 0 : result.replace(/["'`]/g, "");
}
function Pre({
  children
}) {
  const renderChildren = (children2) => {
    const { className, meta } = children2.props;
    const codeTitle = parseTitleFromMeta(meta);
    return /* @__PURE__ */ jsxs10("div", { className: className || DEFAULT_LANGUAGE_CLASS, children: [
      codeTitle && /* @__PURE__ */ jsx18("div", { className: "rspress-code-title", children: codeTitle }),
      /* @__PURE__ */ jsx18("div", { className: "rspress-code-content rspress-scrollbar", children: children2 })
    ] });
  };
  if (Array.isArray(children)) {
    return /* @__PURE__ */ jsx18("div", { children: children.map((child) => renderChildren(child)) });
  }
  return renderChildren(children);
}

// src/layout/DocLayout/docComponents/table.tsx
import { jsx as jsx19 } from "react/jsx-runtime";
var Table = (props) => {
  return /* @__PURE__ */ jsx19(
    "table",
    __spreadProps(__spreadValues({}, props), {
      className: "block border-collapse text-base my-5 overflow-x-auto leading-7 border-gray-light-3 dark:border-divider"
    })
  );
};
var Tr = (props) => {
  return /* @__PURE__ */ jsx19(
    "tr",
    __spreadProps(__spreadValues({}, props), {
      className: "border border-solid transition-colors duration-500 even:bg-soft border-gray-light-3 dark:border-divider"
    })
  );
};
var Td = (props) => {
  return /* @__PURE__ */ jsx19(
    "td",
    __spreadProps(__spreadValues({}, props), {
      className: "border border-solid px-4 py-2 border-gray-light-3 dark:border-divider"
    })
  );
};
var Th = (props) => {
  return /* @__PURE__ */ jsx19(
    "th",
    __spreadProps(__spreadValues({}, props), {
      className: "border border-solid px-4 py-2 text-text-1 text-base font-semibold border-gray-light-3 dark:border-divider"
    })
  );
};

// src/layout/DocLayout/docComponents/index.tsx
function getCustomMDXComponent2() {
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

// src/components/Badge/index.module.scss
var index_module_default5 = { "badge": "badge_99dcf", "tip": "tip_99dcf", "info": "info_99dcf", "warning": "warning_99dcf", "danger": "danger_99dcf", "outline": "outline_99dcf" };

// src/components/Badge/index.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
function Badge({
  children,
  type = "tip",
  text,
  outline = false
}) {
  const content = children || text;
  return /* @__PURE__ */ jsx20(
    "span",
    {
      className: `inline-flex items-center justify-center rounded-full border border-solid ${outline ? "border-current" : "border-transparent"} font-semibold align-middle px-2.5 h-6 gap-1 text-xs ${index_module_default5.badge} ${index_module_default5[type]} ${outline ? index_module_default5.outline : ""}`,
      children: content
    }
  );
}

// src/components/Button/index.tsx
import { Link as Link2 } from "@theme";
import React3 from "react";

// src/components/Button/index.module.scss
var index_module_default6 = { "button": "button_72e53", "medium": "medium_72e53", "big": "big_72e53", "brand": "brand_72e53", "alt": "alt_72e53" };

// src/components/Button/index.tsx
function Button(props) {
  const {
    theme = "brand",
    size = "big",
    href = "/",
    external = false,
    className = ""
  } = props;
  let type = null;
  if (props.type === "button") {
    type = "button";
  } else if (props.type === "a") {
    type = external ? "a" : Link2;
  }
  return React3.createElement(
    type != null ? type : "a",
    {
      className: `${index_module_default6.button} ${index_module_default6[theme]} ${index_module_default6[size]} ${className}`,
      href
    },
    props.text
  );
}

// src/components/Card/index.tsx
import { jsx as jsx21, jsxs as jsxs11 } from "react/jsx-runtime";
function Card({ content, title, icon, style }) {
  return /* @__PURE__ */ jsxs11("div", { className: "border border-gray-400 rounded-lg p-6", style, children: [
    /* @__PURE__ */ jsxs11("p", { className: "flex items-center gap-2 mb-4", children: [
      icon && /* @__PURE__ */ jsx21("div", { children: icon }),
      title && /* @__PURE__ */ jsx21("span", { className: "text-2xl font-bold", children: title })
    ] }),
    /* @__PURE__ */ jsx21("div", { className: "text-base overflow-auto", children: content })
  ] });
}

// src/components/EditLink/index.module.scss
var index_module_default7 = { "editLink": "editLink_2a169" };

// src/components/EditLink/index.tsx
import { jsx as jsx22 } from "react/jsx-runtime";
function EditLink2() {
  const editLinkObj = useEditLink();
  if (!editLinkObj) {
    return null;
  }
  const { text, link } = editLinkObj;
  return /* @__PURE__ */ jsx22("a", { href: link, target: "_blank", className: index_module_default7.editLink, children: text });
}

// src/components/HomeFeature/index.tsx
import { normalizeHrefInRuntime } from "@rspress/runtime";
import { isExternalUrl as isExternalUrl2, withBase as withBase6 } from "@rspress/shared";

// src/components/HomeFeature/index.module.scss
var index_module_default8 = { "grid-2": "grid-2_d48e3", "grid2": "grid-2_d48e3", "grid-4": "grid-4_d48e3", "grid4": "grid-4_d48e3", "grid-6": "grid-6_d48e3", "grid6": "grid-6_d48e3", "grid-3": "grid-3_d48e3", "grid3": "grid-3_d48e3", "featureCard": "featureCard_d48e3" };

// src/components/HomeFeature/index.tsx
import { jsx as jsx23, jsxs as jsxs12 } from "react/jsx-runtime";
var GRID_PREFIX = "grid-";
var getGridClass = (feature) => {
  const { span } = feature;
  return `${GRID_PREFIX}${span || 4}`;
};
function HomeFeature2({
  frontmatter,
  routePath
}) {
  const features = frontmatter == null ? void 0 : frontmatter.features;
  return /* @__PURE__ */ jsx23("div", { className: "overflow-hidden m-auto flex flex-wrap max-w-6xl", children: features == null ? void 0 : features.map((feature) => {
    const { icon, title, details, link: rawLink } = feature;
    let link = rawLink;
    if (rawLink) {
      link = isExternalUrl2(rawLink) ? rawLink : normalizeHrefInRuntime(withBase6(rawLink, routePath));
    }
    return /* @__PURE__ */ jsx23(
      "div",
      {
        className: `${index_module_default8[getGridClass(feature)]} rounded hover:var(--rp-c-brand)`,
        children: /* @__PURE__ */ jsx23("div", { className: "h-full p-2", children: /* @__PURE__ */ jsxs12(
          "article",
          {
            className: `rspress-home-feature-card ${index_module_default8.featureCard} h-full p-8 rounded-4xl border-transparent`,
            style: {
              cursor: link ? "pointer" : "auto"
            },
            onClick: () => {
              if (link) {
                window.location.href = link;
              }
            },
            children: [
              icon ? /* @__PURE__ */ jsx23("div", { className: "flex-center", children: /* @__PURE__ */ jsx23("div", { className: "rspress-home-feature-icon w-12 h-12 text-3xl text-center", children: renderHtmlOrText(icon) }) }) : null,
              /* @__PURE__ */ jsx23("h2", { className: "rspress-home-feature-title font-bold text-center", children: title }),
              /* @__PURE__ */ jsx23("p", { className: "rspress-home-feature-detail leading-6 pt-2 text-sm text-text-2 font-medium", children: renderHtmlOrText(details) })
            ]
          },
          title
        ) })
      },
      title
    );
  }) });
}

// src/components/HomeFooter/index.tsx
import { usePageData as usePageData15 } from "@rspress/runtime";
import { jsx as jsx24 } from "react/jsx-runtime";
function HomeFooter2() {
  const { siteData: siteData3 } = usePageData15();
  const { message } = siteData3.themeConfig.footer || {};
  if (!message) {
    return null;
  }
  return /* @__PURE__ */ jsx24("footer", { className: "absolute bottom-0 mt-12 py-8 px-6 sm:p-8 w-full border-t border-solid border-divider-light", children: /* @__PURE__ */ jsx24("div", { className: "m-auto w-full text-center", children: /* @__PURE__ */ jsx24(
    "div",
    {
      className: "font-medium text-sm text-text-2",
      dangerouslySetInnerHTML: {
        __html: message
      }
    }
  ) }) });
}

// src/components/HomeHero/index.tsx
import { normalizeHrefInRuntime as normalizeHrefInRuntime2, normalizeImagePath as normalizeImagePath2 } from "@rspress/runtime";
import { isExternalUrl as isExternalUrl3, withBase as withBase7 } from "@rspress/shared";
import { Button as Button2 } from "@theme";

// src/components/HomeHero/index.module.scss
var index_module_default9 = { "clip": "clip_c867a", "mask": "mask_c867a" };

// src/components/HomeHero/index.tsx
import { jsx as jsx25, jsxs as jsxs13 } from "react/jsx-runtime";
var DEFAULT_HERO = {
  name: "modern",
  text: "modern ssg",
  tagline: "modern ssg",
  actions: [],
  image: void 0
};
function HomeHero2({
  frontmatter,
  routePath
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const hero = (frontmatter == null ? void 0 : frontmatter.hero) || DEFAULT_HERO;
  const hasImage = hero.image !== void 0;
  const textMaxWidth = hasImage ? "sm:max-w-xl" : "sm:max-w-4xl";
  const multiHeroText = hero.text ? hero.text.toString().split(/\n/g).filter((text) => text !== "") : [];
  const imageSrc = typeof ((_a = hero.image) == null ? void 0 : _a.src) === "string" ? { light: hero.image.src, dark: hero.image.src } : ((_b = hero.image) == null ? void 0 : _b.src) || { light: "", dark: "" };
  return /* @__PURE__ */ jsxs13("div", { className: "m-auto pt-0 px-6 pb-12 sm:pt-10 sm:px-16 md:pt-16 md:px-16 md:pb-16 relative", children: [
    /* @__PURE__ */ jsx25(
      "div",
      {
        className: index_module_default9.mask,
        style: {
          left: hasImage ? "75%" : "50%"
        }
      }
    ),
    /* @__PURE__ */ jsxs13("div", { className: "m-auto flex flex-col md:flex-row max-w-6xl min-h-[50vh] mt-12 sm:mt-0", children: [
      /* @__PURE__ */ jsxs13("div", { className: "flex flex-col justify-center items-center text-center max-w-xl sm:max-w-4xl m-auto order-2 md:order-1", children: [
        /* @__PURE__ */ jsx25("h1", { className: "font-bold text-3xl pb-2 sm:text-6xl md:text-7xl m-auto sm:m-4 md:m-0 md:pb-3 lg:pb-2 leading-tight z-10", children: /* @__PURE__ */ jsx25("span", { className: index_module_default9.clip, style: { lineHeight: "1.3" }, children: renderHtmlOrText(hero.name) }) }),
        multiHeroText.length !== 0 && multiHeroText.map((heroText) => /* @__PURE__ */ jsx25(
          "p",
          {
            className: `rspress-home-hero-text mx-auto md:m-0 text-3xl sm:text-5xl md:text-6xl sm:pb-2 font-bold z-10 ${textMaxWidth}`,
            style: { lineHeight: "1.2" },
            children: renderHtmlOrText(heroText)
          },
          heroText
        )),
        /* @__PURE__ */ jsx25(
          "p",
          {
            className: `rspress-home-hero-tagline whitespace-pre-wrap pt-4 m-auto md:m-0 text-sm sm:tex-xl md:text-[1.5rem] text-text-2 font-medium z-10 ${textMaxWidth}`,
            children: renderHtmlOrText(hero.tagline)
          }
        ),
        ((_c = hero.actions) == null ? void 0 : _c.length) && /* @__PURE__ */ jsx25("div", { className: "grid md:flex md:flex-wrap md:justify-center gap-3 m--1.5 pt-6 sm:pt-8 z-10", children: hero.actions.map((action) => {
          const link = isExternalUrl3(action.link) ? action.link : normalizeHrefInRuntime2(withBase7(action.link, routePath));
          return /* @__PURE__ */ jsx25("div", { className: "flex flex-shrink-0 p-1", children: /* @__PURE__ */ jsx25(
            Button2,
            {
              type: "a",
              href: link,
              text: renderHtmlOrText(action.text),
              theme: action.theme,
              className: "w-full"
            }
          ) }, link);
        }) })
      ] }),
      hasImage ? /* @__PURE__ */ jsxs13("div", { className: "rspress-home-hero-image md:flex-center m-auto order-1 md:order-2 sm:flex md:none lg:flex", children: [
        /* @__PURE__ */ jsx25(
          "img",
          {
            src: normalizeImagePath2(imageSrc.light),
            alt: (_d = hero.image) == null ? void 0 : _d.alt,
            srcSet: normalizeSrcsetAndSizes((_e = hero.image) == null ? void 0 : _e.srcset),
            sizes: normalizeSrcsetAndSizes((_f = hero.image) == null ? void 0 : _f.sizes),
            width: 375,
            height: 375,
            className: "dark:hidden"
          }
        ),
        /* @__PURE__ */ jsx25(
          "img",
          {
            src: normalizeImagePath2(imageSrc.dark),
            alt: (_g = hero.image) == null ? void 0 : _g.alt,
            srcSet: normalizeSrcsetAndSizes((_h = hero.image) == null ? void 0 : _h.srcset),
            sizes: normalizeSrcsetAndSizes((_i = hero.image) == null ? void 0 : _i.sizes),
            width: 375,
            height: 375,
            className: "hidden dark:block"
          }
        )
      ] }) : null
    ] })
  ] });
}
function normalizeSrcsetAndSizes(field) {
  const r = (Array.isArray(field) ? field : [field]).filter(Boolean).join(", ");
  return r || void 0;
}

// src/components/LastUpdated/index.tsx
import { usePageData as usePageData16 } from "@rspress/runtime";
import { jsx as jsx26, jsxs as jsxs14 } from "react/jsx-runtime";
function LastUpdated2() {
  const { lastUpdatedText: localesLastUpdatedText = "Last Updated" } = useLocaleSiteData();
  const {
    page: { lastUpdatedTime },
    siteData: siteData3
  } = usePageData16();
  const { themeConfig } = siteData3;
  const lastUpdatedText = (themeConfig == null ? void 0 : themeConfig.lastUpdatedText) || localesLastUpdatedText;
  return /* @__PURE__ */ jsx26("div", { className: "flex text-sm text-text-2 leading-6 sm:leading-8 font-medium", children: /* @__PURE__ */ jsxs14("p", { children: [
    lastUpdatedText,
    ": ",
    /* @__PURE__ */ jsx26("span", { children: lastUpdatedTime })
  ] }) });
}

// src/components/Link/index.tsx
import {
  isEqualPath as isEqualPath4,
  matchRoutes,
  normalizeHrefInRuntime as normalizeHref4,
  normalizeRoutePath,
  useLocation as useLocation6,
  useNavigate,
  withBase as withBase8
} from "@rspress/runtime";
import { isExternalUrl as isExternalUrl4 } from "@rspress/shared";
import nprogress from "nprogress";
import { routes } from "virtual-routes";

// src/components/Link/index.module.scss
var index_module_default10 = { "link": "link_03735" };

// src/components/Link/index.tsx
import { jsx as jsx27 } from "react/jsx-runtime";
nprogress.configure({ showSpinner: false });
function Link3(props) {
  const _a = props, {
    href = "/",
    children,
    className = "",
    onNavigate,
    keepCurrentParams = false
  } = _a, rest = __objRest(_a, [
    "href",
    "children",
    "className",
    "onNavigate",
    "keepCurrentParams"
  ]);
  const isExternal = isExternalUrl4(href);
  const target = isExternal ? "_blank" : "";
  const rel = isExternal ? "noopener noreferrer" : void 0;
  const withBaseUrl = isExternal ? href : withBase8(normalizeHref4(href));
  const navigate = useNavigate();
  const { pathname, search } = useLocation6();
  const withQueryUrl = keepCurrentParams ? withBaseUrl + search : withBaseUrl;
  const inCurrentPage = isEqualPath4(pathname, withBaseUrl);
  const handleNavigate = (e) => __async(this, null, function* () {
    if (
      // left click only
      e.button !== 0 || // `target` are usually used for open link in new window/tab
      e.currentTarget.target && e.currentTarget.target !== "_self" || // modifier keys are usually used for open link in new window/tab
      e.metaKey || e.shiftKey || e.altKey || e.ctrlKey
    ) {
      return;
    }
    e.preventDefault();
    const hash = withBaseUrl.split("#")[1];
    if (!isExternal && inCurrentPage && hash) {
      const el = document.getElementById(hash);
      if (el) {
        scrollToTarget(el, true);
        navigate(withQueryUrl, { replace: false });
      }
      return;
    }
    if (!process.env.__SSR__ && !inCurrentPage) {
      const matchedRoutes = matchRoutes(
        routes,
        normalizeRoutePath(withBaseUrl)
      );
      if (matchedRoutes == null ? void 0 : matchedRoutes.length) {
        const timer = setTimeout(() => {
          nprogress.start();
        }, 200);
        yield matchedRoutes[0].route.preload();
        clearTimeout(timer);
        nprogress.done();
      }
      onNavigate == null ? void 0 : onNavigate();
      navigate(withQueryUrl, { replace: false });
    }
  });
  if (!isExternal) {
    return /* @__PURE__ */ jsx27(
      "a",
      __spreadProps(__spreadValues({}, rest), {
        className: `${index_module_default10.link} ${className} cursor-pointer`,
        rel,
        target,
        onClick: (event) => {
          var _a2;
          (_a2 = rest.onClick) == null ? void 0 : _a2.call(rest, event);
          handleNavigate(event);
        },
        href: withBaseUrl,
        children
      })
    );
  }
  return /* @__PURE__ */ jsx27(
    "a",
    __spreadProps(__spreadValues({}, rest), {
      href: withBaseUrl,
      target,
      rel,
      className: `${index_module_default10.link} ${className}`,
      children
    })
  );
}

// src/components/LinkCard/index.tsx
import ArrowRight2 from "@theme-assets/arrow-right";

// src/components/LinkCard/index.module.scss
var index_module_default11 = { "link": "link_9ef55", "linkCard": "linkCard_9ef55" };

// src/components/LinkCard/index.tsx
import { jsx as jsx28, jsxs as jsxs15 } from "react/jsx-runtime";
function LinkCard(props) {
  const { href, title, description, style } = props;
  return /* @__PURE__ */ jsxs15(
    "div",
    {
      className: `relative border border-gray-400 rounded-lg p-6 flex justify-between items-start hover:border-gray-500 transition-all duration-300 ${index_module_default11.linkCard}`,
      style,
      children: [
        /* @__PURE__ */ jsxs15("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx28(
            "a",
            {
              href,
              className: `flex items-center gap-2 mb-4 ${index_module_default11.link}`,
              children: title && /* @__PURE__ */ jsx28("span", { className: "text-2xl font-bold", children: title })
            }
          ),
          /* @__PURE__ */ jsx28("span", { className: "text-base overflow-auto", children: description })
        ] }),
        /* @__PURE__ */ jsx28(ArrowRight2, {})
      ]
    }
  );
}

// src/components/Nav/index.tsx
import { useLocation as useLocation9, usePageData as usePageData19 } from "@rspress/runtime";
import { Search } from "@theme";
import { useEffect as useEffect12, useState as useState15 } from "react";

// src/logic/useNav.ts
import { useLocation as useLocation7, useVersion as useVersion2 } from "@rspress/runtime";
import { useEffect as useEffect10, useState as useState10 } from "react";
function useNavScreen() {
  const { pathname } = useLocation7();
  const [isScreenOpen, setIsScreenOpen] = useState10(false);
  function openScreen() {
    setIsScreenOpen(true);
    window.addEventListener("resize", closeScreenOnTabletWindow);
  }
  function closeScreen() {
    setIsScreenOpen(false);
    window.removeEventListener("resize", closeScreenOnTabletWindow);
  }
  function toggleScreen() {
    if (isScreenOpen) {
      closeScreen();
    } else {
      openScreen();
    }
  }
  useEffect10(() => {
    closeScreen();
  }, [pathname]);
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
  const version = useVersion2();
  if (Array.isArray(nav)) {
    return nav;
  }
  const navKey = version.length > 0 ? version : "default";
  return [...nav[navKey]];
}

// src/components/NavHamburger/index.tsx
import SmallMenu from "@theme-assets/small-menu";
import { Fragment as Fragment7 } from "react";

// src/components/NavScreen/index.tsx
import { NoSSR as NoSSR2 } from "@rspress/runtime";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { useEffect as useEffect11, useRef as useRef7 } from "react";

// src/components/Nav/NavMenuSingleItem.tsx
import { normalizeHrefInRuntime as normalizeHref5 } from "@rspress/runtime";
import {
  withoutBase
} from "@rspress/shared";
import { Link as Link4, Tag } from "@theme";

// src/components/Nav/index.module.scss
var index_module_default12 = { "hidden": "hidden_f6cde", "container": "container_f6cde", "navContainer": "navContainer_f6cde", "leftNav": "leftNav_f6cde", "rightNav": "rightNav_f6cde", "singleItem": "singleItem_f6cde", "activeItem": "activeItem_f6cde", "navBarTitle": "navBarTitle_f6cde", "menu-item": "menu-item_f6cde", "menuItem": "menu-item_f6cde", "mobileNavMenu": "mobileNavMenu_f6cde", "mask": "mask_f6cde", "docPage": "docPage_f6cde" };

// src/components/Nav/NavMenuSingleItem.tsx
import { jsx as jsx29, jsxs as jsxs16 } from "react/jsx-runtime";
function NavMenuSingleItem(item) {
  const { pathname, base } = item;
  const isActive2 = new RegExp(item.activeMatch || item.link).test(
    withoutBase(pathname, base)
  );
  return /* @__PURE__ */ jsx29(Link4, { href: normalizeHref5(item.link), onClick: item.onClick, children: /* @__PURE__ */ jsxs16(
    "div",
    {
      className: `rspress-nav-menu-item ${index_module_default12.singleItem} ${isActive2 ? index_module_default12.activeItem : ""} text-sm font-medium ${item.compact ? "mx-0.5" : "mx-1.5"} px-3 py-2 flex items-center`,
      children: [
        /* @__PURE__ */ jsx29(Tag, { tag: item.tag }),
        item.text,
        item.rightIcon
      ]
    },
    item.text
  ) });
}

// src/components/Nav/menuDataHooks.tsx
import { useLocation as useLocation8, usePageData as usePageData17, useVersion as useVersion3 } from "@rspress/runtime";
import { replaceLang, replaceVersion } from "@rspress/shared";
import Translator from "@theme-assets/translator";
import { jsx as jsx30 } from "react/jsx-runtime";
function useTranslationMenuData() {
  var _a, _b;
  const { siteData: siteData3, page } = usePageData17();
  const currentVersion = useVersion3();
  const { pathname, search } = useLocation8();
  const defaultLang = siteData3.lang || "";
  const defaultVersion = siteData3.multiVersion.default || "";
  const localeLanguages = Object.values(
    siteData3.locales || siteData3.themeConfig.locales || {}
  );
  const cleanUrls = ((_a = siteData3.route) == null ? void 0 : _a.cleanUrls) || false;
  const hasMultiLanguage = localeLanguages.length > 1;
  const { lang: currentLang, pageType } = page;
  const { base } = siteData3;
  const translationMenuData = hasMultiLanguage ? {
    text: /* @__PURE__ */ jsx30(
      SvgWrapper,
      {
        icon: Translator,
        style: {
          width: "18px",
          height: "18px"
        }
      }
    ),
    items: localeLanguages.map((item) => ({
      text: item == null ? void 0 : item.label,
      link: replaceLang(
        pathname + search,
        {
          current: currentLang,
          target: item.lang,
          default: defaultLang
        },
        {
          current: currentVersion,
          default: defaultVersion
        },
        base,
        cleanUrls,
        pageType === "404"
      )
    })),
    activeValue: (_b = localeLanguages.find((item) => currentLang === item.lang)) == null ? void 0 : _b.label
  } : { items: [] };
  return translationMenuData;
}
function useVersionMenuData() {
  var _a;
  const { siteData: siteData3, page } = usePageData17();
  const currentVersion = useVersion3();
  const { pathname } = useLocation8();
  const cleanUrls = ((_a = siteData3.route) == null ? void 0 : _a.cleanUrls) || false;
  const defaultVersion = siteData3.multiVersion.default || "";
  const versions = siteData3.multiVersion.versions || [];
  const { base } = siteData3;
  const versionsMenuData = {
    items: versions.map((version) => ({
      text: version,
      link: replaceVersion(
        pathname,
        {
          current: currentVersion,
          target: version,
          default: defaultVersion
        },
        base,
        cleanUrls,
        page.pageType === "404"
      )
    })),
    text: currentVersion,
    activeValue: currentVersion
  };
  return versionsMenuData;
}

// src/components/SocialLinks/index.tsx
import { useCallback as useCallback3, useState as useState12 } from "react";

// src/components/SocialLinks/LinkContent.tsx
import { useState as useState11 } from "react";

// src/components/SocialLinks/index.module.scss
var index_module_default13 = { "social-links-icon": "social-links-icon_93d67", "socialLinksIcon": "social-links-icon_93d67", "menu-item": "menu-item_93d67", "menuItem": "menu-item_93d67" };

// src/components/SocialLinks/LinkContent.tsx
import { Fragment as Fragment5, jsx as jsx31, jsxs as jsxs17 } from "react/jsx-runtime";
var LinkContent = (props) => {
  const { link, popperStyle = {} } = props;
  const { icon, mode = "link", content } = link;
  let IconComp = /* @__PURE__ */ jsx31(Fragment5, {});
  if (icon) {
    const iconMap = process.env.RSPRESS_SOCIAL_ICONS;
    const html = typeof icon === "string" ? iconMap[icon] : icon.svg;
    IconComp = /* @__PURE__ */ jsx31("div", { dangerouslySetInnerHTML: { __html: html } });
  }
  const [contentVisible, setContentVisible] = useState11(false);
  const mouseEnterIcon = () => {
    setContentVisible(true);
  };
  const mouseLeavePopper = () => {
    setContentVisible(false);
  };
  if (mode === "link") {
    return /* @__PURE__ */ jsx31(
      "a",
      {
        href: content,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "social-links",
        children: /* @__PURE__ */ jsx31("div", { className: `${index_module_default13.socialLinksIcon}`, children: IconComp })
      },
      content
    );
  }
  if (mode === "text") {
    return /* @__PURE__ */ jsxs17(
      "div",
      {
        className: `${index_module_default13.socialLinksIcon} cursor-pointer relative mx-3`,
        onMouseEnter: mouseEnterIcon,
        onMouseLeave: mouseLeavePopper,
        children: [
          IconComp,
          contentVisible ? /* @__PURE__ */ jsx31(
            "div",
            {
              style: __spreadValues({
                boxShadow: "var(--rp-shadow-3)",
                border: "1px solid var(--rp-c-divider-light)"
              }, popperStyle),
              className: "z-[1] p-3 w-50 absolute right-0 bg-white dark:bg-dark",
              children: /* @__PURE__ */ jsx31("div", { className: "text-md", children: content })
            }
          ) : null
        ]
      }
    );
  }
  if (mode === "img") {
    return /* @__PURE__ */ jsxs17(
      "div",
      {
        className: `${index_module_default13.socialLinksIcon} cursor-pointer relative`,
        onMouseEnter: mouseEnterIcon,
        onMouseLeave: mouseLeavePopper,
        children: [
          IconComp,
          contentVisible ? /* @__PURE__ */ jsx31(
            "div",
            {
              className: "break-all z-[1] p-3 w-[50px] h-[50px] absolute right-0 bg-white dark:bg-dark rounded-xl",
              style: __spreadValues({
                boxShadow: "var(--rp-shadow-3)"
              }, popperStyle),
              children: /* @__PURE__ */ jsx31("img", { src: content, alt: "img" })
            }
          ) : null
        ]
      }
    );
  }
  if (mode === "dom") {
    return /* @__PURE__ */ jsxs17(
      "div",
      {
        className: `${index_module_default13.socialLinksIcon} cursor-pointer relative`,
        onMouseEnter: mouseEnterIcon,
        onMouseLeave: mouseLeavePopper,
        children: [
          IconComp,
          contentVisible ? /* @__PURE__ */ jsx31(
            "div",
            {
              className: "break-all z-[1] p-3 absolute right-0 bg-white dark:bg-dark rounded-xl",
              style: __spreadValues({
                boxShadow: "var(--rp-shadow-3)"
              }, popperStyle),
              children: /* @__PURE__ */ jsx31("div", { dangerouslySetInnerHTML: { __html: content } })
            }
          ) : null
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx31("div", {});
};

// src/components/SocialLinks/HiddenLinks.tsx
import { jsx as jsx32 } from "react/jsx-runtime";
var HiddenLinks = (props) => {
  const { links } = props;
  return /* @__PURE__ */ jsx32(
    "div",
    {
      style: {
        boxShadow: "var(--rp-shadow-3)",
        marginRight: "-2px",
        border: "1px solid var(--rp-c-divider-light)",
        background: "var(--rp-c-bg)"
      },
      className: "absolute top-8 right-0 z-1 p-3 w-32 rounded-2xl flex flex-wrap gap-4",
      children: links.map((item) => /* @__PURE__ */ jsx32(
        LinkContent,
        {
          link: item,
          popperStyle: { top: "1.25rem" }
        },
        item.content
      ))
    }
  );
};

// src/components/SocialLinks/ShownLinks.tsx
import ArrowDown from "@theme-assets/arrow-down";
import { Fragment as Fragment6, jsx as jsx33, jsxs as jsxs18 } from "react/jsx-runtime";
var ShownLinks = (props) => {
  const { links, moreIconVisible = false, mouseEnter } = props;
  return /* @__PURE__ */ jsxs18(Fragment6, { children: [
    /* @__PURE__ */ jsx33("div", { className: "flex-center h-full gap-x-4 transition-colors duration-300 md:mr-2", children: links.map((item, index) => /* @__PURE__ */ jsx33(
      LinkContent,
      {
        link: item,
        popperStyle: { top: "2.5rem" }
      },
      index
    )) }),
    moreIconVisible ? /* @__PURE__ */ jsx33("div", { className: "md:ml-1 p-2", onMouseEnter: mouseEnter, children: /* @__PURE__ */ jsx33(SvgWrapper, { icon: ArrowDown }) }) : null
  ] });
};

// src/components/SocialLinks/index.tsx
import { jsx as jsx34, jsxs as jsxs19 } from "react/jsx-runtime";
var MORE_LENGTH = 5;
var SocialLinks = ({ socialLinks }) => {
  const isMore = socialLinks.length > MORE_LENGTH;
  const shownLinks = socialLinks.slice(0, MORE_LENGTH);
  const hiddenLinks = socialLinks.slice(MORE_LENGTH);
  const [hiddenLinksVisible, setHiddenLinksVisible] = useState12(false);
  const hide = useCallback3(() => {
    setHiddenLinksVisible(false);
  }, [setHiddenLinksVisible]);
  const show = useCallback3(() => {
    setHiddenLinksVisible(true);
  }, [setHiddenLinksVisible]);
  return /* @__PURE__ */ jsxs19(
    "div",
    {
      className: `social-links ${index_module_default13.menuItem} flex-center relative`,
      onMouseLeave: hide,
      children: [
        /* @__PURE__ */ jsx34(
          ShownLinks,
          {
            links: shownLinks,
            moreIconVisible: isMore,
            mouseEnter: show
          }
        ),
        hiddenLinksVisible ? /* @__PURE__ */ jsx34(HiddenLinks, { links: hiddenLinks }) : null
      ]
    }
  );
};

// src/components/SwitchAppearance/index.tsx
import { ThemeContext } from "@rspress/runtime";
import MoonSvg from "@theme-assets/moon";
import SunSvg from "@theme-assets/sun";
import { useContext } from "react";
import { flushSync } from "react-dom";
import siteData2 from "virtual-site-data";
import { jsx as jsx35, jsxs as jsxs20 } from "react/jsx-runtime";
var supportAppearanceTransition = () => {
  return (
    // @ts-ignore document may not be defined in ssr
    (document == null ? void 0 : document.startViewTransition) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};
var removeClipViewTransition = () => {
  const styleDom = document.createElement("style");
  styleDom.innerHTML = `
      .rspress-doc {
        view-transition-name: none !important;
      }
  `;
  document.head.appendChild(styleDom);
  return () => {
    document.head.removeChild(styleDom);
  };
};
function SwitchAppearance({ onClick }) {
  const { theme, setTheme = () => {
  } } = useContext(ThemeContext);
  const handleClick = (event) => {
    var _a, _b;
    const supported = supportAppearanceTransition();
    const enabled = (_b = (_a = siteData2) == null ? void 0 : _a.themeConfig) == null ? void 0 : _b.enableAppearanceAnimation;
    const nextTheme = theme === "dark" ? "light" : "dark";
    const isDark = nextTheme === "dark";
    if (supported && enabled) {
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x + 200),
        Math.max(y, innerHeight - y + 200)
      );
      const dispose = removeClipViewTransition();
      const transition = document.startViewTransition(() => __async(this, null, function* () {
        flushSync(() => {
          setTheme(nextTheme);
          onClick == null ? void 0 : onClick();
        });
      }));
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: isDark ? [...clipPath].reverse() : clipPath
          },
          {
            duration: 400,
            easing: "ease-in",
            pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
            id: ""
          }
        ).finished.then(() => {
          dispose();
        });
      });
    } else {
      setTheme(nextTheme);
      onClick == null ? void 0 : onClick();
    }
  };
  return /* @__PURE__ */ jsx35("div", { onClick: handleClick, className: "md:mr-2 rspress-nav-appearance", children: /* @__PURE__ */ jsxs20("div", { className: "p-1 border border-solid border-gray-300 text-gray-400  cursor-pointer rounded-md hover:border-gray-600 hover:text-gray-600 dark:hover:border-gray-200 dark:hover:text-gray-200 transition-all duration-300 w-7 h-7", children: [
    /* @__PURE__ */ jsx35(
      SvgWrapper,
      {
        className: "dark:hidden",
        icon: SunSvg,
        width: "18",
        height: "18",
        fill: "currentColor"
      }
    ),
    /* @__PURE__ */ jsx35(
      SvgWrapper,
      {
        className: "hidden dark:block",
        icon: MoonSvg,
        width: "18",
        height: "18",
        fill: "currentColor"
      }
    )
  ] }) });
}

// src/components/NavScreen/NavScreenMenuGroup.tsx
import { Link as Link5 } from "@theme";
import Down from "@theme-assets/down";
import { useState as useState13 } from "react";

// src/components/NavScreen/index.module.scss
var index_module_default14 = { "navScreen": "navScreen_457e8", "active": "active_457e8", "container": "container_457e8", "navMenu": "navMenu_457e8", "navMenuItem": "navMenuItem_457e8", "navAppearance": "navAppearance_457e8", "socialAndAppearance": "socialAndAppearance_457e8", "navScreenMenuGroup": "navScreenMenuGroup_457e8", "open": "open_457e8", "button": "button_457e8", "buttonSpan": "buttonSpan_457e8", "items": "items_457e8", "down": "down_457e8" };

// src/components/NavScreen/NavScreenMenuGroup.tsx
import { jsx as jsx36, jsxs as jsxs21 } from "react/jsx-runtime";
function NavScreenMenuGroup(item) {
  const { activeValue } = item;
  const [isOpen, setIsOpen] = useState13(false);
  function ActiveGroupItem2({ item: item2 }) {
    return /* @__PURE__ */ jsx36("div", { className: "p-1 text-center", children: /* @__PURE__ */ jsx36("span", { className: "text-brand", children: item2.text }) });
  }
  function NormalGroupItem2({ item: item2 }) {
    return /* @__PURE__ */ jsx36("div", { className: "py-1 font-medium", children: /* @__PURE__ */ jsx36(Link5, { href: item2.link, children: /* @__PURE__ */ jsx36("div", { children: /* @__PURE__ */ jsx36("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx36("span", { children: item2.text }) }) }) }) });
  }
  const renderLinkItem = (item2) => {
    if (activeValue === item2.text) {
      return /* @__PURE__ */ jsx36(ActiveGroupItem2, { item: item2 }, item2.link);
    }
    return /* @__PURE__ */ jsx36(NormalGroupItem2, { item: item2 }, item2.link);
  };
  const renderGroup = (item2) => {
    return /* @__PURE__ */ jsxs21("div", { children: [
      "link" in item2 ? renderLinkItem(item2) : /* @__PURE__ */ jsx36("p", { className: "font-bold text-gray-400 my-1 not:first:border", children: item2.text }),
      item2.items.map(renderLinkItem)
    ] });
  };
  return /* @__PURE__ */ jsxs21(
    "div",
    {
      className: `${isOpen ? index_module_default14.open : ""} ${index_module_default14.navScreenMenuGroup} relative`,
      children: [
        /* @__PURE__ */ jsxs21(
          "button",
          {
            className: index_module_default14.button,
            onClick: () => {
              setIsOpen(!isOpen);
            },
            children: [
              /* @__PURE__ */ jsx36("span", { className: index_module_default14.buttonSpan, children: item.text }),
              /* @__PURE__ */ jsx36(Down, { className: `${isOpen ? index_module_default14.open : ""} ${index_module_default14.down} ` })
            ]
          }
        ),
        /* @__PURE__ */ jsx36("div", { children: /* @__PURE__ */ jsx36("div", { className: index_module_default14.items, children: item.items.map((item2) => {
          return /* @__PURE__ */ jsx36("div", { children: "items" in item2 ? renderGroup(item2) : renderLinkItem(item2) }, item2.text);
        }) }) })
      ]
    }
  );
}

// src/components/NavScreen/index.tsx
import { jsx as jsx37, jsxs as jsxs22 } from "react/jsx-runtime";
var NavScreenTranslations = () => {
  const translationMenuData = useTranslationMenuData();
  return /* @__PURE__ */ jsx37("div", { className: "flex text-sm font-bold justify-center", children: /* @__PURE__ */ jsx37("div", { className: "mx-1.5 my-1", children: /* @__PURE__ */ jsx37(NavScreenMenuGroup, __spreadValues({}, translationMenuData)) }) });
};
var NavScreenVersions = () => {
  const versionMenuData = useVersionMenuData();
  return /* @__PURE__ */ jsx37(
    "div",
    {
      className: `${index_module_default14.navTranslations} flex text-sm font-bold justify-center`,
      children: /* @__PURE__ */ jsx37("div", { className: "mx-1.5 my-1", children: /* @__PURE__ */ jsx37(NavScreenMenuGroup, __spreadValues({}, versionMenuData)) })
    }
  );
};
function NavScreen(props) {
  var _a;
  const { isScreenOpen, toggleScreen, siteData: siteData3, pathname } = props;
  const screen = useRef7(null);
  const localesData = siteData3.themeConfig.locales || [];
  const hasMultiLanguage = localesData.length > 1;
  const hasMultiVersion = siteData3.multiVersion.versions.length > 1;
  const menuItems = useNavData();
  const hasAppearanceSwitch = siteData3.themeConfig.darkMode !== false;
  const socialLinks = ((_a = siteData3 == null ? void 0 : siteData3.themeConfig) == null ? void 0 : _a.socialLinks) || [];
  const hasSocialLinks = socialLinks.length > 0;
  const langs = localesData.map((item) => item.lang || "zh") || [];
  const { base } = siteData3;
  const NavScreenAppearance = () => {
    return /* @__PURE__ */ jsx37("div", { className: `mt-2 ${index_module_default14.navAppearance} flex justify-center`, children: /* @__PURE__ */ jsx37(NoSSR2, { children: /* @__PURE__ */ jsx37(SwitchAppearance, {}) }) });
  };
  const NavScreenMenu = ({ menuItems: menuItems2 }) => {
    return /* @__PURE__ */ jsx37("div", { className: index_module_default14.navMenu, children: menuItems2.map((item) => {
      return /* @__PURE__ */ jsx37("div", { className: `${index_module_default14.navMenuItem} w-full`, children: "link" in item ? /* @__PURE__ */ jsx37(
        NavMenuSingleItem,
        __spreadValues({
          pathname,
          base,
          langs,
          onClick: toggleScreen
        }, item),
        item.text
      ) : /* @__PURE__ */ jsx37("div", { className: "mx-3 last:mr-0", children: /* @__PURE__ */ jsx37(
        NavScreenMenuGroup,
        __spreadProps(__spreadValues({}, item), {
          items: "items" in item ? item.items : item
        })
      ) }, item.text) }, item.text);
    }) });
  };
  useEffect11(() => {
    screen.current && isScreenOpen && disableBodyScroll(screen.current, { reserveScrollBarGap: true });
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isScreenOpen]);
  return /* @__PURE__ */ jsx37(
    "div",
    {
      className: `${index_module_default14.navScreen} ${isScreenOpen ? index_module_default14.active : ""} rspress-nav-screen`,
      ref: screen,
      id: "navScreen",
      children: /* @__PURE__ */ jsxs22("div", { className: index_module_default14.container, children: [
        /* @__PURE__ */ jsx37(NavScreenMenu, { menuItems }),
        /* @__PURE__ */ jsxs22("div", { className: "flex-center flex-col gap-2", children: [
          hasAppearanceSwitch && /* @__PURE__ */ jsx37(NavScreenAppearance, {}),
          hasMultiLanguage && /* @__PURE__ */ jsx37(NavScreenTranslations, {}),
          hasMultiVersion && /* @__PURE__ */ jsx37(NavScreenVersions, {}),
          hasSocialLinks && /* @__PURE__ */ jsx37(SocialLinks, { socialLinks })
        ] })
      ] })
    }
  );
}

// src/components/NavHamburger/index.module.scss
var index_module_default15 = { "navHamburger": "navHamburger_300ff", "container": "container_300ff", "top": "top_300ff", "middle": "middle_300ff", "bottom": "bottom_300ff", "active": "active_300ff" };

// src/components/NavHamburger/index.tsx
import { jsx as jsx38, jsxs as jsxs23 } from "react/jsx-runtime";
function NavHamburger(props) {
  const { siteData: siteData3, pathname } = props;
  const { isScreenOpen, toggleScreen } = useNavScreen();
  return /* @__PURE__ */ jsxs23(Fragment7, { children: [
    /* @__PURE__ */ jsx38(
      NavScreen,
      {
        isScreenOpen,
        toggleScreen,
        siteData: siteData3,
        pathname
      }
    ),
    /* @__PURE__ */ jsx38(
      "button",
      {
        onClick: toggleScreen,
        "aria-label": "mobile hamburger",
        className: `${isScreenOpen ? index_module_default15.active : ""} rspress-mobile-hamburger ${index_module_default15.navHamburger} text-gray-500`,
        children: /* @__PURE__ */ jsx38(SvgWrapper, { icon: SmallMenu, fill: "currentColor" })
      }
    )
  ] });
}

// src/components/Nav/NavBarTitle.tsx
import { normalizeImagePath as normalizeImagePath3, usePageData as usePageData18 } from "@rspress/runtime";
import { Link as Link6 } from "@theme";
import { useMemo as useMemo3 } from "react";
import { Fragment as Fragment8, jsx as jsx39, jsxs as jsxs24 } from "react/jsx-runtime";
var NavBarTitle = () => {
  var _a;
  const { siteData: siteData3 } = usePageData18();
  const localeData = useLocaleSiteData();
  const { logo: rawLogo, logoText } = siteData3;
  const title = (_a = localeData.title) != null ? _a : siteData3.title;
  const logo = useMemo3(() => {
    if (!rawLogo) {
      return null;
    }
    if (typeof rawLogo === "string") {
      return /* @__PURE__ */ jsx39(
        "img",
        {
          src: normalizeImagePath3(rawLogo),
          alt: "logo",
          id: "logo",
          className: "rspress-logo"
        }
      );
    }
    return /* @__PURE__ */ jsxs24(Fragment8, { children: [
      /* @__PURE__ */ jsx39(
        "img",
        {
          src: normalizeImagePath3(rawLogo.light),
          alt: "logo",
          id: "logo",
          className: "rspress-logo dark:hidden"
        }
      ),
      /* @__PURE__ */ jsx39(
        "img",
        {
          src: normalizeImagePath3(rawLogo.dark),
          alt: "logo",
          id: "logo",
          className: "rspress-logo hidden dark:block"
        }
      )
    ] });
  }, [rawLogo]);
  return /* @__PURE__ */ jsx39("div", { className: `${index_module_default12.navBarTitle}`, children: /* @__PURE__ */ jsxs24(
    Link6,
    {
      href: localeData.langRoutePrefix,
      className: "flex items-center w-full h-full text-base font-semibold transition-opacity duration-300 hover:opacity-60",
      children: [
        logo && /* @__PURE__ */ jsx39("div", { className: "mr-1 min-w-8", children: logo }),
        logoText && /* @__PURE__ */ jsx39("span", { children: logoText }),
        !logo && !logoText && /* @__PURE__ */ jsx39("span", { children: title })
      ]
    }
  ) });
};

// src/components/Nav/NavMenuGroup.tsx
import {
  withoutBase as withoutBase2
} from "@rspress/shared";
import { Link as Link7, Tag as Tag2 } from "@theme";
import Down2 from "@theme-assets/down";
import { useState as useState14 } from "react";
import { Fragment as Fragment9, jsx as jsx40, jsxs as jsxs25 } from "react/jsx-runtime";
function ActiveGroupItem({ item }) {
  return /* @__PURE__ */ jsxs25(
    "div",
    {
      className: "rounded-2xl my-1 flex",
      style: {
        padding: "0.4rem 1.5rem 0.4rem 0.75rem"
      },
      children: [
        item.tag && /* @__PURE__ */ jsx40(Tag2, { tag: item.tag }),
        /* @__PURE__ */ jsx40("span", { className: "text-brand", children: item.text })
      ]
    },
    item.link
  );
}
function NormalGroupItem({ item }) {
  return /* @__PURE__ */ jsx40("div", { className: "font-medium my-1", children: /* @__PURE__ */ jsx40(Link7, { href: item.link, children: /* @__PURE__ */ jsx40(
    "div",
    {
      className: "rounded-2xl hover:bg-mute",
      style: {
        padding: "0.4rem 1.5rem 0.4rem 0.75rem"
      },
      children: /* @__PURE__ */ jsxs25("div", { className: "flex", children: [
        item.tag && /* @__PURE__ */ jsx40(Tag2, { tag: item.tag }),
        /* @__PURE__ */ jsx40("span", { children: item.text })
      ] })
    }
  ) }) }, item.link);
}
function NavMenuGroup(item) {
  const {
    activeValue,
    items: groupItems,
    base = "",
    link = "",
    pathname = ""
  } = item;
  const [isOpen, setIsOpen] = useState14(false);
  const renderLinkItem = (item2) => {
    const isLinkActive = new RegExp(item2.activeMatch || item2.link).test(
      withoutBase2(pathname, base)
    );
    if (activeValue === item2.text || !activeValue && isLinkActive) {
      return /* @__PURE__ */ jsx40(ActiveGroupItem, { item: item2 }, item2.link);
    }
    return /* @__PURE__ */ jsx40(NormalGroupItem, { item: item2 }, item2.link);
  };
  const renderGroup = (item2) => {
    return /* @__PURE__ */ jsxs25("div", { children: [
      "link" in item2 ? renderLinkItem(item2) : /* @__PURE__ */ jsx40("p", { className: "font-bold text-gray-400 my-1 not:first:border", children: item2.text }),
      item2.items.map(renderLinkItem)
    ] });
  };
  return /* @__PURE__ */ jsxs25(
    "div",
    {
      className: "relative flex-center h-14",
      onMouseLeave: () => setIsOpen(false),
      children: [
        /* @__PURE__ */ jsx40(
          "button",
          {
            onMouseEnter: () => setIsOpen(true),
            className: "rspress-nav-menu-group-button flex-center items-center font-medium text-sm text-text-1 hover:text-text-2 transition-colors duration-200",
            children: link ? (
              // @ts-expect-error item.text may be ReactElement
              /* @__PURE__ */ jsx40(NavMenuSingleItem, __spreadProps(__spreadValues({}, item), { rightIcon: /* @__PURE__ */ jsx40(SvgWrapper, { icon: Down2 }) }))
            ) : /* @__PURE__ */ jsxs25(Fragment9, { children: [
              /* @__PURE__ */ jsxs25(
                "span",
                {
                  className: "text-sm font-medium flex",
                  style: {
                    marginRight: "2px"
                  },
                  children: [
                    /* @__PURE__ */ jsx40(Tag2, { tag: item.tag }),
                    item.text
                  ]
                }
              ),
              /* @__PURE__ */ jsx40(SvgWrapper, { icon: Down2 })
            ] })
          }
        ),
        /* @__PURE__ */ jsx40(
          "div",
          {
            className: "rspress-nav-menu-group-content absolute mx-0.8 transition-opacity duration-300",
            style: {
              opacity: isOpen ? 1 : 0,
              visibility: isOpen ? "visible" : "hidden",
              right: 0,
              top: "52px"
            },
            children: /* @__PURE__ */ jsx40(
              "div",
              {
                className: "p-3 pr-2 w-full h-full max-h-100vh whitespace-nowrap",
                style: {
                  boxShadow: "var(--rp-shadow-3)",
                  zIndex: 100,
                  border: "1px solid var(--rp-c-divider-light)",
                  borderRadius: "var(--rp-radius-large)",
                  background: "var(--rp-c-bg)"
                },
                children: groupItems.map((item2) => {
                  return /* @__PURE__ */ jsx40("div", { children: "items" in item2 ? renderGroup(item2) : renderLinkItem(item2) }, item2.text);
                })
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/Nav/NavTranslations.tsx
import { jsx as jsx41 } from "react/jsx-runtime";
function NavTranslations() {
  const translationMenuData = useTranslationMenuData();
  return /* @__PURE__ */ jsx41(
    "div",
    {
      className: `translation ${index_module_default12.menuItem} flex text-sm font-bold items-center px-3 py-2`,
      children: /* @__PURE__ */ jsx41("div", { children: /* @__PURE__ */ jsx41(NavMenuGroup, __spreadValues({}, translationMenuData)) })
    }
  );
}

// src/components/Nav/NavVersions.tsx
import { jsx as jsx42 } from "react/jsx-runtime";
function NavVersions() {
  const versionsMenuData = useVersionMenuData();
  return /* @__PURE__ */ jsx42(
    "div",
    {
      className: `translation ${index_module_default12.menuItem} flex text-sm font-bold items-center px-3 py-2`,
      children: /* @__PURE__ */ jsx42("div", { children: /* @__PURE__ */ jsx42(NavMenuGroup, __spreadValues({}, versionsMenuData)) })
    }
  );
}

// src/components/Nav/index.tsx
import { Fragment as Fragment10, jsx as jsx43, jsxs as jsxs26 } from "react/jsx-runtime";
var DEFAULT_NAV_POSITION = "right";
function Nav2(props) {
  var _a;
  const { beforeNavTitle, afterNavTitle, beforeNav, afterNavMenu, navTitle } = props;
  const { siteData: siteData3, page } = usePageData19();
  const { base } = siteData3;
  const { pathname } = useLocation9();
  const [isMobile, setIsMobile] = useState15(false);
  const hiddenNav = useHiddenNav();
  const localeLanguages = Object.values(
    siteData3.locales || siteData3.themeConfig.locales || {}
  );
  const hasMultiLanguage = localeLanguages.length > 1;
  const hasMultiVersion = siteData3.multiVersion.versions.length > 1;
  const socialLinks = siteData3.themeConfig.socialLinks || [];
  const hasSocialLinks = socialLinks.length > 0;
  const langs = localeLanguages.map((item) => item.lang || "") || [];
  const updateIsMobile = () => {
    setIsMobile(isMobileDevice());
  };
  useEffect12(() => {
    window.addEventListener("resize", updateIsMobile);
    setIsMobile(isMobileDevice());
    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);
  const NavMenu = ({ menuItems: menuItems2 }) => {
    return /* @__PURE__ */ jsx43("div", { className: "rspress-nav-menu menu h-14", children: menuItems2.map((item) => {
      return "items" in item || Array.isArray(item) ? /* @__PURE__ */ jsx43("div", { className: "mx-3 last:mr-0", children: /* @__PURE__ */ jsx43(
        NavMenuGroup,
        __spreadProps(__spreadValues({}, item), {
          base,
          pathname,
          langs,
          items: "items" in item ? item.items : item
        })
      ) }, item.text) : /* @__PURE__ */ jsx43(
        NavMenuSingleItem,
        __spreadValues({
          pathname,
          langs,
          base,
          compact: menuItems2.length > 5
        }, item),
        item.link
      );
    }) });
  };
  const menuItems = useNavData();
  const getPosition = (menuItem) => {
    var _a2;
    return (_a2 = menuItem.position) != null ? _a2 : DEFAULT_NAV_POSITION;
  };
  const leftMenuItems = menuItems.filter((item) => getPosition(item) === "left");
  const rightMenuItems = menuItems.filter(
    (item) => getPosition(item) === "right"
  );
  const hasSearch = ((_a = siteData3 == null ? void 0 : siteData3.themeConfig) == null ? void 0 : _a.search) !== false;
  const hasAppearanceSwitch = siteData3.themeConfig.darkMode !== false;
  const leftNav = () => {
    return leftMenuItems.length > 0 ? /* @__PURE__ */ jsx43("div", { className: index_module_default12.leftNav, children: /* @__PURE__ */ jsx43(NavMenu, { menuItems: leftMenuItems }) }) : null;
  };
  const rightNav = () => {
    return /* @__PURE__ */ jsxs26("div", { className: index_module_default12.rightNav, children: [
      hasSearch && /* @__PURE__ */ jsx43("div", { className: "flex sm:flex-1 items-center sm:pl-4 sm:pr-2", children: /* @__PURE__ */ jsx43(Search, {}) }),
      /* @__PURE__ */ jsx43(NavMenu, { menuItems: rightMenuItems }),
      /* @__PURE__ */ jsxs26("div", { className: "flex-center flex-row", children: [
        hasMultiLanguage && /* @__PURE__ */ jsx43(NavTranslations, {}),
        hasMultiVersion && /* @__PURE__ */ jsx43(NavVersions, {}),
        hasAppearanceSwitch && /* @__PURE__ */ jsx43("div", { className: "mx-2", children: /* @__PURE__ */ jsx43(SwitchAppearance, {}) }),
        hasSocialLinks && /* @__PURE__ */ jsx43(SocialLinks, { socialLinks })
      ] })
    ] });
  };
  const computeNavPosition = () => {
    if (!isMobile) {
      return "sticky";
    }
    if (siteData3.themeConfig.hideNavbar === "never" && page.pageType !== "doc")
      return "sticky";
    return "relative";
  };
  return /* @__PURE__ */ jsxs26(Fragment10, { children: [
    beforeNav,
    /* @__PURE__ */ jsx43(
      "div",
      {
        className: `${index_module_default12.navContainer} rspress-nav px-6 ${// Only hidden when it's not mobile
        hiddenNav && !isMobile ? index_module_default12.hidden : ""} ${computeNavPosition()}`,
        children: /* @__PURE__ */ jsxs26(
          "div",
          {
            className: `${index_module_default12.container} flex justify-between items-center h-full`,
            children: [
              beforeNavTitle,
              navTitle || /* @__PURE__ */ jsx43(NavBarTitle, {}),
              afterNavTitle,
              /* @__PURE__ */ jsxs26("div", { className: "flex flex-1 justify-end items-center", children: [
                leftNav(),
                rightNav(),
                afterNavMenu,
                /* @__PURE__ */ jsxs26("div", { className: index_module_default12.mobileNavMenu, children: [
                  isMobile && hasSearch && /* @__PURE__ */ jsx43(Search, {}),
                  /* @__PURE__ */ jsx43(NavHamburger, { siteData: siteData3, pathname })
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}

// src/components/Overview/index.tsx
import {
  isEqualPath as isEqualPath5,
  normalizeHrefInRuntime as normalizeHref6,
  usePageData as usePageData20,
  withBase as withBase10
} from "@rspress/runtime";
import { Link as Link8 } from "@theme";
import { useEffect as useEffect13, useMemo as useMemo4, useRef as useRef8, useState as useState16 } from "react";

// src/components/Sidebar/utils.ts
import { matchRoutes as matchRoutes2, removeBase as removeBase3, useLocation as useLocation10 } from "@rspress/runtime";
import {
  isExternalUrl as isExternalUrl5,
  normalizeSlash
} from "@rspress/shared";
import { routes as routes2 } from "virtual-routes";
var isSidebarDivider = (item) => {
  return "dividerType" in item;
};
var isSidebarSingleFile = (item) => !("items" in item) && "link" in item;
var isSidebarSectionHeader = (item) => {
  return "sectionHeaderText" in item;
};
var isSideBarCustomLink = (item) => {
  return "link" in item && isExternalUrl5(item.link);
};
var preloadLink = (link) => {
  const match2 = matchRoutes2(routes2, link);
  if (match2 == null ? void 0 : match2.length) {
    const { route } = match2[0];
    route.preload();
  }
};
var useActiveMatcher = () => {
  const localesData = useLocaleSiteData();
  const langRoutePrefix = normalizeSlash(localesData.langRoutePrefix || "");
  const { pathname: rawPathname } = useLocation10();
  const pathname = decodeURIComponent(rawPathname);
  const removeLangPrefix = (path) => {
    return path.replace(langRoutePrefix, "");
  };
  const activeMatcher = (link) => {
    return isActive(
      removeBase3(removeLangPrefix(pathname)),
      removeLangPrefix(link),
      true
    );
  };
  return activeMatcher;
};

// src/components/Overview/index.module.scss
var index_module_default16 = { "header-anchor": "header-anchor_8f375", "headerAnchor": "header-anchor_8f375", "overview-groups": "overview-groups_8f375", "overviewGroups": "overview-groups_8f375", "overview-group-li": "overview-group-li_8f375", "overviewGroupLi": "overview-group-li_8f375", "level-2": "level-2_8f375", "level2": "level-2_8f375", "level-3": "level-3_8f375", "level3": "level-3_8f375", "level-4": "level-4_8f375", "level4": "level-4_8f375", "overview-group": "overview-group_8f375", "overviewGroup": "overview-group_8f375", "header": "header_8f375" };

// src/components/Overview/utils.ts
import { withBase as withBase9 } from "@rspress/runtime";
function removeIndex(link) {
  if (link.endsWith("/index")) {
    return link.slice(0, -5);
  }
  return link;
}
function findItemByRoutePath(items, routePath) {
  function isRoutePathMatch(item) {
    if (isSidebarDivider(item)) {
      return false;
    }
    const withBaseUrl = withBase9(item.link);
    const removeIndexUrl = removeIndex(withBaseUrl);
    const removeBackSlashedRoutePath = routePath.replace(/\/$/, "");
    return (
      // FIXME: 😅 we should refactor all the path logic, /index.html / or no /, l
      withBaseUrl === routePath || removeIndexUrl === routePath || withBaseUrl === removeBackSlashedRoutePath || removeIndexUrl === removeBackSlashedRoutePath
    );
  }
  const matchRoutePathItemIndex = items.findIndex((item) => {
    return isRoutePathMatch(item);
  });
  if (matchRoutePathItemIndex === -1) {
    return items.map((item) => {
      if (!("items" in item)) {
        return [];
      }
      return findItemByRoutePath(item.items, routePath);
    }).flat();
  }
  const matchRoutePathItem = items[matchRoutePathItemIndex];
  const isArray = (i) => Array.isArray(i) && i.length >= 1;
  if ("items" in matchRoutePathItem && isArray(matchRoutePathItem.items)) {
    if (matchRoutePathItem.items.every((item) => !("items" in item))) {
      return [matchRoutePathItem];
    }
    return matchRoutePathItem.items.filter((item) => !isSidebarDivider(item));
  }
  const result = [...items];
  if (!("items" in matchRoutePathItem)) {
    result.splice(matchRoutePathItemIndex, 1);
  }
  const res = result.filter((item) => !isSidebarDivider(item));
  return res;
}

// src/components/Overview/index.tsx
import { jsx as jsx44, jsxs as jsxs27 } from "react/jsx-runtime";
var normalizeText = (s) => s.toLowerCase().replace(/-/g, " ");
var matchesQuery = (text, query) => normalizeText(text).includes(normalizeText(query));
var SearchInput = ({
  query,
  setQuery,
  searchRef,
  filterNameText,
  filterPlaceholderText
}) => {
  return /* @__PURE__ */ jsxs27("div", { className: "flex items-center justify-start gap-4", children: [
    /* @__PURE__ */ jsx44("label", { htmlFor: "api-filter", children: filterNameText }),
    /* @__PURE__ */ jsx44(
      "input",
      {
        ref: searchRef,
        type: "search",
        placeholder: filterPlaceholderText,
        id: "api-filter",
        value: query,
        onChange: (e) => setQuery(e.target.value),
        className: "border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 transition-shadow duration-250 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      }
    )
  ] });
};
var GroupRenderer = ({
  group,
  styles
}) => /* @__PURE__ */ jsxs27("div", { className: "mb-16", children: [
  /* @__PURE__ */ jsx44("h2", { children: renderInlineMarkdown(group.name) }),
  /* @__PURE__ */ jsx44("div", { className: styles.overviewGroups, children: group.items.map((item) => {
    var _a;
    return /* @__PURE__ */ jsxs27("div", { className: styles.overviewGroup, children: [
      /* @__PURE__ */ jsx44("div", { className: "flex", children: /* @__PURE__ */ jsx44("h3", { style: { marginBottom: 8 }, children: /* @__PURE__ */ jsx44(Link8, { href: normalizeHref6(item.link), children: renderInlineMarkdown(item.text) }) }) }),
      /* @__PURE__ */ jsx44("ul", { className: "list-none", children: (_a = item.headers) == null ? void 0 : _a.map((header) => /* @__PURE__ */ jsx44(
        "li",
        {
          className: `${styles.overviewGroupLi} ${styles[`level${header.depth}`]} first:mt-2`,
          children: /* @__PURE__ */ jsx44(Link8, { href: `${normalizeHref6(item.link)}#${header.id}`, children: renderInlineMarkdown(header.text) })
        },
        header.id
      )) })
    ] }, item.link);
  }) })
] }, group.name);
function Overview2(props) {
  var _a;
  const {
    siteData: siteData3,
    page: { routePath, title, frontmatter }
  } = usePageData20();
  const { content, groups: customGroups, defaultGroupTitle = "Others" } = props;
  const [query, setQuery] = useState16("");
  const searchRef = useRef8(null);
  useEffect13(() => {
    var _a2;
    (_a2 = searchRef.current) == null ? void 0 : _a2.focus();
  }, []);
  const subFilter = (link) => (
    // sidebar items link without base path
    // pages route path with base path
    withBase10(link).startsWith(routePath.replace(/overview$/, "")) && !isEqualPath5(withBase10(link), routePath)
  );
  const getChildLink = (traverseItem) => {
    if ("link" in traverseItem && traverseItem.link) {
      return traverseItem.link;
    }
    if ("items" in traverseItem) {
      return getChildLink(traverseItem.items[0]);
    }
    return "";
  };
  const { pages } = siteData3;
  const overviewModules = pages.filter((page) => subFilter(page.routePath));
  let { items: overviewSidebarGroups } = useSidebarData();
  const {
    overview: {
      filterNameText = "Filter",
      filterPlaceholderText = "Enter keyword",
      filterNoResultText = "No matching API found"
    } = {}
  } = useLocaleSiteData();
  if (((_a = overviewSidebarGroups[0]) == null ? void 0 : _a.link) !== routePath) {
    overviewSidebarGroups = findItemByRoutePath(
      overviewSidebarGroups,
      routePath
    );
  }
  function normalizeSidebarItem(item, sidebarGroup, frontmatter2) {
    var _a2, _b, _c, _d, _e;
    if (isSidebarDivider(item)) {
      return false;
    }
    if (withBase10(item.link) === `${routePath}index` && (frontmatter2 == null ? void 0 : frontmatter2.overview) === true) {
      return false;
    }
    const overviewHeaders = (_d = (_c = (_b = (_a2 = props == null ? void 0 : props.overviewHeaders) != null ? _a2 : item.overviewHeaders) != null ? _b : frontmatter2 == null ? void 0 : frontmatter2.overviewHeaders) != null ? _c : sidebarGroup == null ? void 0 : sidebarGroup.overviewHeaders) != null ? _d : [2];
    const pageModule = overviewModules.find(
      (m) => isEqualPath5(m.routePath, withBase10(item.link || ""))
    );
    const link = getChildLink(item);
    return __spreadProps(__spreadValues({}, item), {
      link,
      headers: ((_e = pageModule == null ? void 0 : pageModule.toc) == null ? void 0 : _e.filter(
        (header) => overviewHeaders.some((depth) => header.depth === depth)
      )) || []
    });
  }
  const groups = customGroups != null ? customGroups : useMemo4(() => {
    const group = overviewSidebarGroups.filter((normalizedSidebarGroup) => {
      const sidebarGroup = normalizedSidebarGroup;
      if (Array.isArray(sidebarGroup == null ? void 0 : sidebarGroup.items)) {
        return sidebarGroup.items.filter((item) => subFilter(getChildLink(item))).length > 0;
      }
      if (isSidebarSingleFile(sidebarGroup) && subFilter(getChildLink(sidebarGroup))) {
        return true;
      }
      return false;
    }).map((normalizedSidebarGroup) => {
      var _a2;
      const sidebarGroup = normalizedSidebarGroup;
      let items = [];
      if (sidebarGroup == null ? void 0 : sidebarGroup.items) {
        items = (_a2 = sidebarGroup == null ? void 0 : sidebarGroup.items) == null ? void 0 : _a2.map(
          (item) => normalizeSidebarItem(item, sidebarGroup, frontmatter)
        ).filter(Boolean);
      } else if (isSidebarSingleFile(sidebarGroup)) {
        items = [
          normalizeSidebarItem(
            {
              link: sidebarGroup.link,
              text: sidebarGroup.text || "",
              tag: sidebarGroup.tag,
              _fileKey: sidebarGroup._fileKey,
              overviewHeaders: sidebarGroup.overviewHeaders
            },
            void 0,
            frontmatter
          )
        ];
      }
      return {
        name: sidebarGroup.text || "",
        items
      };
    });
    return group;
  }, [overviewSidebarGroups, routePath, frontmatter]);
  const filtered = useMemo4(() => {
    if (!query)
      return groups;
    return groups.map((group) => {
      if (matchesQuery(group.name, query)) {
        return group;
      }
      const matchedItems = group.items.map((item) => {
        var _a2;
        if (matchesQuery(item.text || "", query)) {
          return item;
        }
        const matchedHeaders = (_a2 = item.headers) == null ? void 0 : _a2.filter(
          ({ text }) => matchesQuery(text, query)
        );
        return (matchedHeaders == null ? void 0 : matchedHeaders.length) ? __spreadProps(__spreadValues({}, item), { headers: matchedHeaders }) : null;
      }).filter(Boolean);
      return matchedItems.length ? __spreadProps(__spreadValues({}, group), { items: matchedItems }) : null;
    }).filter(Boolean);
  }, [groups, query]);
  const overviewTitle = title || "Overview";
  return /* @__PURE__ */ jsxs27("div", { className: "overview-index mx-auto px-8", children: [
    /* @__PURE__ */ jsxs27("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10", children: [
      /* @__PURE__ */ jsx44("h1", { className: "text-3xl leading-10 tracking-tight", children: overviewTitle }),
      /* @__PURE__ */ jsx44(
        SearchInput,
        {
          query,
          setQuery,
          searchRef,
          filterNameText,
          filterPlaceholderText
        }
      )
    ] }),
    content,
    filtered.length > 0 ? filtered.map((group) => /* @__PURE__ */ jsx44(GroupRenderer, { group, styles: index_module_default16 }, group == null ? void 0 : group.name)) : /* @__PURE__ */ jsx44("div", { className: "text-lg text-gray-500 text-center mt-9 pt-9 border-t border-gray-200 dark:border-gray-800", children: `${filterNoResultText}: ${query}` })
  ] });
}

// src/components/PackageManagerTabs/index.tsx
import { Tab, Tabs } from "@theme";

// src/components/PackageManagerTabs/icons/Bun.tsx
import { jsx as jsx45, jsxs as jsxs28 } from "react/jsx-runtime";
function Bun(props) {
  return /* @__PURE__ */ jsxs28("svg", __spreadProps(__spreadValues({ id: "Bun", width: "1.2em", height: "1.2em", viewBox: "0 0 80 70" }, props), { children: [
    /* @__PURE__ */ jsx45(
      "path",
      {
        id: "Shadow",
        d: "M71.09,20.74c-.16-.17-.33-.34-.5-.5s-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5A26.46,26.46,0,0,1,75.5,35.7c0,16.57-16.82,30.05-37.5,30.05-11.58,0-21.94-4.23-28.83-10.86l.5.5.5.5.5.5.5.5.5.5.5.5.5.5C19.55,65.3,30.14,69.75,42,69.75c20.68,0,37.5-13.48,37.5-30C79.5,32.69,76.46,26,71.09,20.74Z"
      }
    ),
    /* @__PURE__ */ jsxs28("g", { id: "Body", children: [
      /* @__PURE__ */ jsx45(
        "path",
        {
          id: "Background",
          d: "M73,35.7c0,15.21-15.67,27.54-35,27.54S3,50.91,3,35.7C3,26.27,9,17.94,18.22,13S33.18,3,38,3s8.94,4.13,19.78,10C67,17.94,73,26.27,73,35.7Z",
          style: { fill: "#fbf0df" }
        }
      ),
      /* @__PURE__ */ jsx45(
        "path",
        {
          id: "Bottom_Shadow",
          "data-name": "Bottom Shadow",
          d: "M73,35.7a21.67,21.67,0,0,0-.8-5.78c-2.73,33.3-43.35,34.9-59.32,24.94A40,40,0,0,0,38,63.24C57.3,63.24,73,50.89,73,35.7Z",
          style: { fill: "#f6dece" }
        }
      ),
      /* @__PURE__ */ jsx45(
        "path",
        {
          id: "Light_Shine",
          "data-name": "Light Shine",
          d: "M24.53,11.17C29,8.49,34.94,3.46,40.78,3.45A9.29,9.29,0,0,0,38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7c0,.4,0,.8,0,1.19C9.06,15.48,20.07,13.85,24.53,11.17Z",
          style: { fill: "#fffefc" }
        }
      ),
      /* @__PURE__ */ jsx45(
        "path",
        {
          id: "Top",
          d: "M35.12,5.53A16.41,16.41,0,0,1,29.49,18c-.28.25-.06.73.3.59,3.37-1.31,7.92-5.23,6-13.14C35.71,5,35.12,5.12,35.12,5.53Zm2.27,0A16.24,16.24,0,0,1,39,19c-.12.35.31.65.55.36C41.74,16.56,43.65,11,37.93,5,37.64,4.74,37.19,5.14,37.39,5.49Zm2.76-.17A16.42,16.42,0,0,1,47,17.12a.33.33,0,0,0,.65.11c.92-3.49.4-9.44-7.17-12.53C40.08,4.54,39.82,5.08,40.15,5.32ZM21.69,15.76a16.94,16.94,0,0,0,10.47-9c.18-.36.75-.22.66.18-1.73,8-7.52,9.67-11.12,9.45C21.32,16.4,21.33,15.87,21.69,15.76Z",
          style: { fill: "#ccbea7", fillRule: "evenodd" }
        }
      ),
      /* @__PURE__ */ jsx45(
        "path",
        {
          id: "Outline",
          d: "M38,65.75C17.32,65.75.5,52.27.5,35.7c0-10,6.18-19.33,16.53-24.92,3-1.6,5.57-3.21,7.86-4.62,1.26-.78,2.45-1.51,3.6-2.19C32,1.89,35,.5,38,.5s5.62,1.2,8.9,3.14c1,.57,2,1.19,3.07,1.87,2.49,1.54,5.3,3.28,9,5.27C69.32,16.37,75.5,25.69,75.5,35.7,75.5,52.27,58.68,65.75,38,65.75ZM38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7,3,50.89,18.7,63.25,38,63.25S73,50.89,73,35.7C73,26.62,67.31,18.13,57.78,13,54,11,51.05,9.12,48.66,7.64c-1.09-.67-2.09-1.29-3-1.84C42.63,4,40.42,3,38,3Z"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs28("g", { id: "Mouth", children: [
      /* @__PURE__ */ jsx45("g", { id: "Background-2", "data-name": "Background", children: /* @__PURE__ */ jsx45(
        "path",
        {
          d: "M45.05,43a8.93,8.93,0,0,1-2.92,4.71,6.81,6.81,0,0,1-4,1.88A6.84,6.84,0,0,1,34,47.71,8.93,8.93,0,0,1,31.12,43a.72.72,0,0,1,.8-.81H44.26A.72.72,0,0,1,45.05,43Z",
          style: { fill: "#b71422" }
        }
      ) }),
      /* @__PURE__ */ jsxs28("g", { id: "Tongue", children: [
        /* @__PURE__ */ jsx45(
          "path",
          {
            id: "Background-3",
            "data-name": "Background",
            d: "M34,47.79a6.91,6.91,0,0,0,4.12,1.9,6.91,6.91,0,0,0,4.11-1.9,10.63,10.63,0,0,0,1-1.07,6.83,6.83,0,0,0-4.9-2.31,6.15,6.15,0,0,0-5,2.78C33.56,47.4,33.76,47.6,34,47.79Z",
            style: { fill: "#ff6164" }
          }
        ),
        /* @__PURE__ */ jsx45(
          "path",
          {
            id: "Outline-2",
            "data-name": "Outline",
            d: "M34.16,47a5.36,5.36,0,0,1,4.19-2.08,6,6,0,0,1,4,1.69c.23-.25.45-.51.66-.77a7,7,0,0,0-4.71-1.93,6.36,6.36,0,0,0-4.89,2.36A9.53,9.53,0,0,0,34.16,47Z"
          }
        )
      ] }),
      /* @__PURE__ */ jsx45(
        "path",
        {
          id: "Outline-3",
          "data-name": "Outline",
          d: "M38.09,50.19a7.42,7.42,0,0,1-4.45-2,9.52,9.52,0,0,1-3.11-5.05,1.2,1.2,0,0,1,.26-1,1.41,1.41,0,0,1,1.13-.51H44.26a1.44,1.44,0,0,1,1.13.51,1.19,1.19,0,0,1,.25,1h0a9.52,9.52,0,0,1-3.11,5.05A7.42,7.42,0,0,1,38.09,50.19Zm-6.17-7.4c-.16,0-.2.07-.21.09a8.29,8.29,0,0,0,2.73,4.37A6.23,6.23,0,0,0,38.09,49a6.28,6.28,0,0,0,3.65-1.73,8.3,8.3,0,0,0,2.72-4.37.21.21,0,0,0-.2-.09Z"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs28("g", { id: "Face", children: [
      /* @__PURE__ */ jsx45(
        "ellipse",
        {
          id: "Right_Blush",
          "data-name": "Right Blush",
          cx: "53.22",
          cy: "40.18",
          rx: "5.85",
          ry: "3.44",
          style: {
            fill: "#febbd0"
          }
        }
      ),
      /* @__PURE__ */ jsx45(
        "ellipse",
        {
          id: "Left_Bluch",
          "data-name": "Left Bluch",
          cx: "22.95",
          cy: "40.18",
          rx: "5.85",
          ry: "3.44",
          style: { fill: "#febbd0" }
        }
      ),
      /* @__PURE__ */ jsx45(
        "path",
        {
          id: "Eyes",
          d: "M25.7,38.8a5.51,5.51,0,1,0-5.5-5.51A5.51,5.51,0,0,0,25.7,38.8Zm24.77,0A5.51,5.51,0,1,0,45,33.29,5.5,5.5,0,0,0,50.47,38.8Z",
          style: { fillRule: "evenodd" }
        }
      ),
      /* @__PURE__ */ jsx45(
        "path",
        {
          id: "Iris",
          d: "M24,33.64a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,24,33.64Zm24.77,0a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,48.75,33.64Z",
          style: {
            fill: "#fff",
            fillRule: "evenodd"
          }
        }
      )
    ] })
  ] }));
}

// src/components/PackageManagerTabs/icons/Npm.tsx
import { jsx as jsx46, jsxs as jsxs29 } from "react/jsx-runtime";
function Npm(props) {
  return /* @__PURE__ */ jsxs29(
    "svg",
    __spreadProps(__spreadValues({
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 256 256"
    }, props), {
      children: [
        /* @__PURE__ */ jsx46("path", { fill: "#C12127", d: "M0 256V0h256v256z" }),
        /* @__PURE__ */ jsx46("path", { fill: "#FFF", d: "M48 48h160v160h-32V80h-48v128H48z" })
      ]
    })
  );
}

// src/components/PackageManagerTabs/icons/Pnpm.tsx
import { jsx as jsx47, jsxs as jsxs30 } from "react/jsx-runtime";
function Pnpm(props) {
  return /* @__PURE__ */ jsxs30(
    "svg",
    __spreadProps(__spreadValues({
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 128 128"
    }, props), {
      children: [
        /* @__PURE__ */ jsx47(
          "path",
          {
            fill: "#f8ab00",
            d: "M0 .004V40h39.996V.004Zm43.996 0V40h40V.004Zm44.008 0V40H128V.004Zm0 43.996v39.996H128V44Z"
          }
        ),
        /* @__PURE__ */ jsx47(
          "path",
          {
            fill: "#4c4c4c",
            d: "M43.996 44v39.996h40V44ZM0 87.996v40h39.996v-40Zm43.996 0v40h40v-40Zm44.008 0v40H128v-40Z"
          }
        )
      ]
    })
  );
}

// src/components/PackageManagerTabs/icons/Yarn.tsx
import { jsx as jsx48, jsxs as jsxs31 } from "react/jsx-runtime";
function Yarn(props) {
  return /* @__PURE__ */ jsx48(
    "svg",
    __spreadProps(__spreadValues({
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 128 128"
    }, props), {
      children: /* @__PURE__ */ jsxs31("g", { fill: "#2c8ebb", children: [
        /* @__PURE__ */ jsx48("path", { d: "M99.24 80.71C94.9 80.76 91.1 83 87.89 85c-6 3.71-9 3.47-9 3.47l-.1-.17c-.41-.67 1.92-6.68-.69-13.84c-2.82-7.83-7.3-9.72-6.94-10.32c1.53-2.59 5.36-6.7 6.89-14.36c.91-4.64.67-12.28-1.39-16.28c-.38-.74-3.78 1.24-3.78 1.24s-3.18-7.09-4.07-7.66c-2.87-1.84-6 7.61-6 7.61a14 14 0 0 0-11.71 4.5a9.64 9.64 0 0 1-3.85 2.27c-.41.14-.91.12-2.15 3.47c-1.9 5.07 3.24 10.81 3.24 10.81s-6.13 4.33-8.4 9.72a24.78 24.78 0 0 0-1.75 11.68s-4.36 3.78-4.64 7.68a12.87 12.87 0 0 0 1.77 7.83a1.94 1.94 0 0 0 2.63.91s-2.9 3.38-.19 4.81c2.47 1.29 6.63 2 8.83-.19c1.6-1.6 1.92-5.17 2.51-6.63c.14-.34.62.57 1.08 1a10 10 0 0 0 1.36 1s-3.9 1.68-2.3 5.51c.53 1.27 2.42 2.08 5.51 2.06c1.15 0 13.76-.72 17.12-1.53a4.33 4.33 0 0 0 2.61-1.46a63 63 0 0 0 15.49-7c4.74-3.09 6.68-3.93 10.51-4.84c3.16-.75 2.95-5.65-1.24-5.58z" }),
        /* @__PURE__ */ jsx48("path", { d: "M64 2a62 62 0 1 0 62 62A62 62 0 0 0 64 2zm37.3 87.83c-3.35.81-4.91 1.44-9.41 4.36a67 67 0 0 1-15.56 7.18a8.71 8.71 0 0 1-3.64 1.77c-3.81.93-16.88 1.63-17.91 1.63h-.24c-4 0-6.27-1.24-7.49-2.54c-3.4 1.7-7.8 1-11-.69a5.55 5.55 0 0 1-3-3.9a6 6 0 0 1 0-2.06a6.66 6.66 0 0 1-.79-1A16.38 16.38 0 0 1 30 84.52c.29-3.73 2.87-7.06 4.55-8.83A28.56 28.56 0 0 1 36.61 64a26.82 26.82 0 0 1 6.82-9c-1.65-2.78-3.33-7.06-1.7-11.42c1.17-3.11 2.13-4.84 4.24-5.58a6.84 6.84 0 0 0 2.51-1.34A17.65 17.65 0 0 1 60.34 31c.19-.48.41-1 .65-1.46c1.6-3.4 3.3-5.31 5.29-6a4.88 4.88 0 0 1 4.4.5c.65.43 1.48 1 3.9 6a4.69 4.69 0 0 1 2.85-.1a3.81 3.81 0 0 1 2.39 1.94c2.47 4.74 2.8 13.19 1.72 18.62a33.8 33.8 0 0 1-5.84 13.31a25.73 25.73 0 0 1 5.77 9.43a25.42 25.42 0 0 1 1.41 10.41A28.7 28.7 0 0 0 86 81.91c3.06-1.89 7.68-4.74 13.19-4.81a6.62 6.62 0 0 1 7 5.7a6.35 6.35 0 0 1-4.89 7.03z" })
      ] })
    })
  );
}

// src/components/PackageManagerTabs/index.tsx
import { Tab as Tab2 } from "@theme";
import { jsx as jsx49, jsxs as jsxs32 } from "react/jsx-runtime";
function normalizeCommand(command) {
  if (command.startsWith("yarn create")) {
    return command.replace(/(yarn create [^\s]+)@latest/, "$1");
  }
  if (!(command == null ? void 0 : command.includes("install"))) {
    return command;
  }
  const pureCommand = command.split(" ").filter((item) => !item.startsWith("-") && !item.startsWith("--")).join(" ");
  if (pureCommand === "yarn install" || pureCommand === "bun install") {
    return command;
  }
  return command.replace("install", "add");
}
function PackageManagerTabs({
  command,
  additionalTabs = []
}) {
  let commandInfo;
  const packageMangerToIcon = {
    npm: /* @__PURE__ */ jsx49(Npm, {}),
    yarn: /* @__PURE__ */ jsx49(Yarn, {}),
    pnpm: /* @__PURE__ */ jsx49(Pnpm, {}),
    bun: /* @__PURE__ */ jsx49(Bun, {})
  };
  additionalTabs.forEach((tab) => {
    packageMangerToIcon[tab.tool] = tab.icon;
  });
  if (typeof command === "string") {
    commandInfo = {
      npm: `npm ${command}`,
      yarn: `yarn ${command}`,
      pnpm: `pnpm ${command}`,
      bun: `bun ${command}`
    };
    additionalTabs.forEach((tab) => {
      commandInfo[tab.tool] = `${tab.tool} ${command}`;
    });
  } else {
    commandInfo = command;
  }
  commandInfo.yarn && (commandInfo.yarn = normalizeCommand(commandInfo.yarn));
  commandInfo.bun && (commandInfo.bun = normalizeCommand(commandInfo.bun));
  return /* @__PURE__ */ jsx49(
    Tabs,
    {
      groupId: "package.manager",
      values: Object.entries(commandInfo).map(([key]) => /* @__PURE__ */ jsxs32(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            fontSize: 15
          },
          children: [
            packageMangerToIcon[key],
            /* @__PURE__ */ jsx49("span", { style: { marginLeft: 6, marginBottom: 2 }, children: key })
          ]
        },
        key
      )),
      children: Object.entries(commandInfo).map(([key, value]) => /* @__PURE__ */ jsx49(Tab, { children: /* @__PURE__ */ jsx49(Pre, { children: /* @__PURE__ */ jsx49(Code, { className: "language-js", codeHighlighter: "prism", children: value }) }) }, key))
    }
  );
}

// src/components/PrevNextPage/index.tsx
import { Link as Link9 } from "@theme";

// src/components/PrevNextPage/index.module.scss
var index_module_default17 = { "pager-link": "pager-link_9b9a7", "pagerLink": "pager-link_9b9a7", "title": "title_9b9a7", "next": "next_9b9a7", "desc": "desc_9b9a7" };

// src/components/PrevNextPage/index.tsx
import { jsx as jsx50, jsxs as jsxs33 } from "react/jsx-runtime";
function PrevNextPage2(props) {
  const { type, text, href } = props;
  const { prevPageText = "Previous Page", nextPageText = "Next Page" } = useLocaleSiteData();
  const pageText = type === "prev" ? prevPageText : nextPageText;
  const linkClassName = type === "prev" ? index_module_default17.pagerLink : `${index_module_default17.pagerLink} ${index_module_default17.next}`;
  return /* @__PURE__ */ jsxs33(Link9, { href, className: linkClassName, children: [
    /* @__PURE__ */ jsx50("span", { className: index_module_default17.desc, children: pageText }),
    /* @__PURE__ */ jsx50("span", { className: index_module_default17.title, children: text })
  ] });
}

// src/components/ScrollToTop/index.tsx
import { useEffect as useEffect14, useState as useState17 } from "react";

// src/components/ScrollToTop/index.module.scss
var index_module_default18 = { "scroll-to-top": "scroll-to-top_1a167", "scrollToTop": "scroll-to-top_1a167", "entered": "entered_1a167" };

// src/components/ScrollToTop/index.tsx
import { jsx as jsx51 } from "react/jsx-runtime";
function ScrollToTop2() {
  const [isVisible, setIsVisible] = useState17(false);
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 0);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect14(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsx51(
    "button",
    {
      className: `${index_module_default18.scrollToTop} ${isVisible ? index_module_default18.entered : ""}`,
      onClick: scrollToTop,
      children: /* @__PURE__ */ jsx51(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "currentColor",
          className: "w-6 h-6",
          children: /* @__PURE__ */ jsx51(
            "path",
            {
              fillRule: "evenodd",
              d: "M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z",
              clipRule: "evenodd"
            }
          )
        }
      )
    }
  );
}

// src/components/Search/index.tsx
import SearchSvg2 from "@theme-assets/search";
import { useEffect as useEffect17, useState as useState20 } from "react";

// src/components/Search/SearchPanel.tsx
import { usePageData as usePageData21 } from "@rspress/runtime";
import { isProduction as isProduction2 } from "@rspress/shared";
import CloseSvg from "@theme-assets/close";
import LoadingSvg from "@theme-assets/loading";
import SearchSvg from "@theme-assets/search";
import { debounce } from "lodash-es";
import { useCallback as useCallback4, useEffect as useEffect16, useRef as useRef10, useState as useState19 } from "react";
import { createPortal } from "react-dom";
import * as userSearchHooks from "virtual-search-hooks";

// src/components/Tabs/index.tsx
import {
  Children,
  forwardRef,
  isValidElement,
  useContext as useContext2,
  useEffect as useEffect15,
  useMemo as useMemo5,
  useState as useState18
} from "react";

// src/components/Tabs/index.module.scss
var index_module_default19 = { "container": "container_fa768", "tab-list": "tab-list_fa768", "tabList": "tab-list_fa768", "tab": "tab_fa768", "not-selected": "not-selected_fa768", "notSelected": "not-selected_fa768", "selected": "selected_fa768", "no-scrollbar": "no-scrollbar_fa768", "noScrollbar": "no-scrollbar_fa768" };

// src/components/Tabs/index.tsx
import { jsx as jsx52, jsxs as jsxs34 } from "react/jsx-runtime";
function isTabItem(item) {
  if (item && typeof item === "object" && "label" in item) {
    return true;
  }
  return false;
}
var renderTab = (item) => {
  if (isTabItem(item)) {
    return item.label || item.value;
  }
  return item;
};
var groupIdPrefix = "rspress.tabs.";
var Tabs2 = forwardRef(
  (props, ref) => {
    const {
      values,
      defaultValue,
      onChange,
      children: rawChildren,
      groupId,
      tabPosition = "left",
      tabContainerClassName
    } = props;
    const children = Children.toArray(rawChildren).filter(
      (child) => !(typeof child === "string" && child.trim() === "")
    );
    let tabValues = values || [];
    if (tabValues.length === 0) {
      tabValues = Children.map(children, (child) => {
        var _a, _b, _c;
        if (isValidElement(child)) {
          return {
            label: (_a = child.props) == null ? void 0 : _a.label,
            value: ((_b = child.props) == null ? void 0 : _b.value) || ((_c = child.props) == null ? void 0 : _c.label)
          };
        }
        return {
          label: void 0,
          value: void 0
        };
      });
    }
    const { tabData, setTabData } = useContext2(TabDataContext);
    const [activeIndex, setActiveIndex] = useState18(() => {
      if (defaultValue === void 0) {
        return 0;
      }
      return tabValues.findIndex((item) => {
        if (typeof item === "string") {
          return item === defaultValue;
        }
        if (item && typeof item === "object" && "value" in item) {
          return item.value === defaultValue;
        }
        return false;
      });
    });
    const [storageIndex, setStorageIndex] = useStorageValue(
      `${groupIdPrefix}${groupId}`,
      activeIndex.toString()
    );
    const syncIndex = useMemo5(() => {
      if (groupId) {
        if (tabData[groupId] !== void 0) {
          return tabData[groupId];
        }
        return Number.parseInt(storageIndex);
      }
      return activeIndex;
    }, [groupId && tabData[groupId]]);
    useEffect15(() => {
      if (groupId) {
        const correctIndex = Number.parseInt(storageIndex);
        if (syncIndex !== correctIndex) {
          setTabData(__spreadProps(__spreadValues({}, tabData), { [groupId]: correctIndex }));
        }
      }
    }, [storageIndex]);
    const currentIndex = groupId ? syncIndex : activeIndex;
    return /* @__PURE__ */ jsxs34("div", { className: index_module_default19.container, ref, children: [
      /* @__PURE__ */ jsx52("div", { className: tabContainerClassName, children: tabValues.length ? /* @__PURE__ */ jsx52(
        "div",
        {
          className: `${index_module_default19.tabList} ${index_module_default19.noScrollbar}`,
          style: {
            justifyContent: tabPosition === "center" ? "center" : "flex-start"
          },
          children: tabValues.map((item, index) => {
            return /* @__PURE__ */ jsx52(
              "div",
              {
                className: `${index_module_default19.tab} ${currentIndex === index ? index_module_default19.selected : index_module_default19.notSelected}`,
                onClick: () => {
                  onChange == null ? void 0 : onChange(index);
                  if (groupId) {
                    setTabData(__spreadProps(__spreadValues({}, tabData), { [groupId]: index }));
                    setStorageIndex(index.toString());
                  } else {
                    setActiveIndex(index);
                  }
                },
                children: renderTab(item)
              },
              index
            );
          })
        }
      ) : null }),
      /* @__PURE__ */ jsx52("div", { children: Children.toArray(children)[currentIndex] })
    ] });
  }
);
function Tab3(_a) {
  var _b = _a, {
    children
  } = _b, props = __objRest(_b, [
    "children"
  ]);
  return /* @__PURE__ */ jsx52("div", __spreadProps(__spreadValues({}, props), { className: "rounded px-2", children }));
}

// src/components/Search/NoSearchResult.tsx
import Empty from "@theme-assets/empty";
import { jsx as jsx53, jsxs as jsxs35 } from "react/jsx-runtime";
function NoSearchResult({ query }) {
  const {
    searchNoResultsText = "No results for",
    searchSuggestedQueryText = "Please try again with a different keyword"
  } = useLocaleSiteData();
  return /* @__PURE__ */ jsxs35("div", { className: "flex flex-col items-center pt-8 pb-2", children: [
    /* @__PURE__ */ jsx53(SvgWrapper, { icon: Empty, className: "mb-4 opacity-80" }),
    /* @__PURE__ */ jsxs35("p", { className: "mb-2", children: [
      searchNoResultsText,
      " ",
      /* @__PURE__ */ jsxs35("b", { children: [
        '"',
        query,
        '"'
      ] })
    ] }),
    /* @__PURE__ */ jsx53("p", { children: searchSuggestedQueryText })
  ] });
}

// src/components/Search/SuggestItem.tsx
import { isProduction } from "@rspress/runtime";
import FileSvg from "@theme-assets/file";
import HeaderSvg from "@theme-assets/header";
import JumpSvg from "@theme-assets/jump";
import TitleSvg from "@theme-assets/title";
import { useRef as useRef9 } from "react";

// src/components/Search/index.module.scss
var index_module_default20 = { "mask": "mask_6e282", "modal": "modal_6e282", "inputForm": "inputForm_6e282", "input": "input_6e282", "close": "close_6e282", "searchHits": "searchHits_6e282", "groupTitle": "groupTitle_6e282", "navSearchButton": "navSearchButton_6e282", "searchWord": "searchWord_6e282", "suggestItem": "suggestItem_6e282", "suggestItemContainer": "suggestItemContainer_6e282", "contentWrapper": "contentWrapper_6e282", "mark": "mark_6e282", "titleForContent": "titleForContent_6e282", "actionIcon": "actionIcon_6e282", "current": "current_6e282", "tabClassName": "tabClassName_6e282", "mobileNavSearchButton": "mobileNavSearchButton_6e282" };

// src/components/Search/SuggestItem.tsx
import { Fragment as Fragment11, jsx as jsx54, jsxs as jsxs36 } from "react/jsx-runtime";
var ICON_MAP = {
  title: TitleSvg,
  header: HeaderSvg,
  content: FileSvg
};
function SuggestItem({
  suggestion,
  closeSearch,
  isCurrent,
  setCurrentSuggestionIndex,
  inCurrentDocIndex,
  scrollTo,
  onMouseMove
}) {
  var _a, _b, _c;
  const HitIcon = ICON_MAP[suggestion.type];
  const link = inCurrentDocIndex && !isProduction() ? removeDomain(suggestion.link) : suggestion.link;
  const selfRef = useRef9(null);
  if (isCurrent && ((_a = selfRef.current) == null ? void 0 : _a.offsetTop)) {
    scrollTo((_b = selfRef.current) == null ? void 0 : _b.offsetTop, (_c = selfRef.current) == null ? void 0 : _c.offsetHeight);
  }
  const getHighlightedFragments = (rawText, highlights) => {
    const fragmentList = [];
    let lastIndex = 0;
    for (const highlightInfo of highlights) {
      const { start, length } = highlightInfo;
      const prefix = rawText.slice(lastIndex, start);
      const queryStr = getSlicedStrByByteLength(rawText, start, length);
      fragmentList.push(prefix);
      fragmentList.push(
        /* @__PURE__ */ jsx54("span", { className: index_module_default20.mark, children: queryStr }, start)
      );
      lastIndex = start + queryStr.length;
    }
    if (lastIndex < rawText.length) {
      fragmentList.push(rawText.slice(lastIndex));
    }
    return fragmentList;
  };
  const renderHeaderMatch = () => {
    if (suggestion.type === "header" || suggestion.type === "title") {
      const { header, highlightInfoList } = suggestion;
      return /* @__PURE__ */ jsx54("div", { className: "font-medium", children: getHighlightedFragments(header, highlightInfoList) });
    }
    return /* @__PURE__ */ jsx54("div", { className: "font-medium", children: suggestion.header });
  };
  const renderStatementMatch = () => {
    if (suggestion.type !== "content") {
      return /* @__PURE__ */ jsx54("div", {});
    }
    const { statement, highlightInfoList } = suggestion;
    return /* @__PURE__ */ jsx54("div", { className: "text-sm text-gray-light w-full", children: getHighlightedFragments(statement, highlightInfoList) });
  };
  let hitContent = null;
  switch (suggestion.type) {
    case "title":
    case "header":
      hitContent = renderHeaderMatch();
      break;
    case "content":
      hitContent = /* @__PURE__ */ jsxs36(Fragment11, { children: [
        renderStatementMatch(),
        /* @__PURE__ */ jsx54("p", { className: index_module_default20.titleForContent, children: suggestion.title })
      ] });
      break;
    default:
      break;
  }
  return /* @__PURE__ */ jsx54(
    "li",
    {
      className: `rspress-search-suggest-item ${index_module_default20.suggestItem} ${isCurrent ? index_module_default20.current : ""}`,
      onMouseEnter: setCurrentSuggestionIndex,
      onMouseMove,
      ref: selfRef,
      children: /* @__PURE__ */ jsx54(
        "a",
        {
          href: link,
          onClick: (e) => {
            closeSearch();
            e.stopPropagation();
          },
          target: inCurrentDocIndex ? "_self" : "_blank",
          children: /* @__PURE__ */ jsxs36("div", { className: index_module_default20.suggestItemContainer, children: [
            /* @__PURE__ */ jsx54("div", { className: index_module_default20.hitIcon, children: /* @__PURE__ */ jsx54(SvgWrapper, { icon: HitIcon }) }),
            /* @__PURE__ */ jsx54("div", { className: index_module_default20.contentWrapper, children: /* @__PURE__ */ jsx54("span", { children: hitContent }) }),
            /* @__PURE__ */ jsx54("div", { className: index_module_default20.actionIcon, children: /* @__PURE__ */ jsx54(SvgWrapper, { icon: JumpSvg }) })
          ] })
        }
      )
    },
    suggestion.link
  );
}

// src/components/Search/SearchPanel.tsx
import { Fragment as Fragment12, jsx as jsx55, jsxs as jsxs37 } from "react/jsx-runtime";
var KEY_CODE = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ENTER: "Enter",
  SEARCH: "KeyK",
  ESC: "Escape"
};
var useDebounce = (cb) => {
  const cbRef = useRef10(cb);
  cbRef.current = cb;
  const debounced = useCallback4(
    debounce((...args) => cbRef.current(...args), 150),
    []
  );
  return debounced;
};
function SearchPanel({ focused, setFocused }) {
  var _a, _b, _c, _d;
  const [query, setQuery] = useState19("");
  const [searchResult, setSearchResult] = useState19([]);
  const searchInputRef = useRef10(null);
  const [initing, setIniting] = useState19(true);
  const [isSearching, setIsSearching] = useState19(false);
  const [resultTabIndex, setResultTabIndex] = useState19(0);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState19(0);
  const pageSearcherRef = useRef10(null);
  const pageSearcherConfigRef = useRef10(null);
  const searchResultRef = useRef10(null);
  const searchResultTabRef = useRef10(null);
  const mousePositionRef = useRef10({
    pageX: null,
    pageY: null
  });
  const [canScroll, setCanScroll] = useState19(false);
  const scrollTo = (offsetTop, offsetHeight) => {
    var _a2, _b2, _c2, _d2;
    const currentOffsetHeight = (_a2 = searchResultRef.current) == null ? void 0 : _a2.offsetHeight;
    const currentScrollTop = (_b2 = searchResultRef.current) == null ? void 0 : _b2.scrollTop;
    if (canScroll && currentOffsetHeight !== void 0 && currentScrollTop !== void 0) {
      const scrollDown = offsetTop + offsetHeight - currentOffsetHeight - (searchResult.length === 1 ? 50 : -10);
      if (scrollDown > currentScrollTop) {
        (_c2 = searchResultRef.current) == null ? void 0 : _c2.scrollTo({
          top: scrollDown
        });
      }
      const scrollUp = searchResult.length === 1 ? offsetTop - 70 : offsetTop - 10;
      if (scrollUp < currentScrollTop) {
        (_d2 = searchResultRef.current) == null ? void 0 : _d2.scrollTo({
          top: scrollUp
        });
      }
    }
  };
  const {
    siteData: siteData3,
    page: { lang, version }
  } = usePageData21();
  const { sidebar, searchPlaceholderText = "Search Docs" } = useLocaleSiteData();
  const { search, title: siteTitle } = siteData3;
  const versionedSearch = search && search.mode !== "remote" && search.versioned;
  const DEFAULT_RESULT = [
    { group: siteTitle, result: [], renderType: "default" /* Default */ }
  ];
  const currentSuggestions = (_b = (_a = searchResult[resultTabIndex]) == null ? void 0 : _a.result) != null ? _b : [];
  const currentRenderType = (_d = (_c = searchResult[resultTabIndex]) == null ? void 0 : _c.renderType) != null ? _d : "default" /* Default */;
  const extractGroupName = (link) => getSidebarData(sidebar, link).group;
  function initPageSearcher() {
    return __async(this, null, function* () {
      var _a2, _b2;
      if (search === false) {
        return;
      }
      const pageSearcherConfig = {
        currentLang: lang,
        currentVersion: version,
        extractGroupName
      };
      const pageSearcher = new PageSearcher(__spreadValues(__spreadValues({
        indexName: siteTitle
      }, search), pageSearcherConfig));
      pageSearcherRef.current = pageSearcher;
      pageSearcherConfigRef.current = pageSearcherConfig;
      yield pageSearcherRef.current.init();
      setIniting(false);
      const query2 = (_a2 = searchInputRef.current) == null ? void 0 : _a2.value;
      if (query2) {
        const matched = yield (_b2 = pageSearcherRef.current) == null ? void 0 : _b2.match(query2);
        setSearchResult(matched || DEFAULT_RESULT);
        setIsSearching(false);
      }
    });
  }
  const clearSearchState = () => {
    setFocused(false);
    setResultTabIndex(0);
    setCurrentSuggestionIndex(0);
  };
  useEffect16(() => {
    const onKeyDown = (e) => {
      switch (e.code) {
        case KEY_CODE.SEARCH:
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setFocused(!focused);
          }
          break;
        case KEY_CODE.ARROW_DOWN:
          if (focused) {
            e.preventDefault();
            if (currentSuggestions && currentRenderType === "default" /* Default */) {
              setCanScroll(true);
              setCurrentSuggestionIndex(
                (currentSuggestionIndex + 1) % currentSuggestions.length
              );
            }
          }
          break;
        case KEY_CODE.ARROW_UP:
          if (focused) {
            e.preventDefault();
            if (currentRenderType === "default" /* Default */) {
              const currentSuggestionsLength = currentSuggestions.length;
              setCanScroll(true);
              setCurrentSuggestionIndex(
                (currentSuggestionIndex - 1 + currentSuggestionsLength) % currentSuggestionsLength
              );
            }
          }
          break;
        case KEY_CODE.ENTER:
          if (currentSuggestionIndex >= 0 && currentRenderType === "default" /* Default */) {
            const flatSuggestions = [
              ...Object.values(normalizeSuggestions(currentSuggestions))
            ].flat();
            const suggestion = flatSuggestions[currentSuggestionIndex];
            const isCurrent = resultTabIndex === 0;
            if (isCurrent) {
              window.location.href = isProduction2() ? suggestion.link : removeDomain(suggestion.link);
            } else {
              window.open(suggestion.link);
            }
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
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [
    setCurrentSuggestionIndex,
    setFocused,
    focused,
    resultTabIndex,
    currentSuggestions,
    currentSuggestionIndex
  ]);
  useEffect16(() => {
    if (focused) {
      setSearchResult(DEFAULT_RESULT);
      if (!pageSearcherRef.current) {
        initPageSearcher();
      }
    } else {
      setQuery("");
    }
  }, [focused]);
  useEffect16(() => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        if (!pageSearcherRef.current) {
          initPageSearcher();
        }
      });
    }
  }, []);
  useEffect16(() => {
    var _a2;
    const { currentLang, currentVersion } = (_a2 = pageSearcherConfigRef.current) != null ? _a2 : {};
    const isLangChanged = lang !== currentLang;
    const isVersionChanged = versionedSearch && version !== currentVersion;
    if (!initing && (isLangChanged || isVersionChanged)) {
      initPageSearcher();
    }
  }, [lang, version, versionedSearch]);
  const handleQueryChangedImpl = (value) => __async(this, null, function* () {
    var _a2, _b2;
    let newQuery = value;
    setQuery(newQuery);
    if (search && search.mode === "remote" && search.searchLoading) {
      setIsSearching(true);
    }
    if (newQuery) {
      const searchResult2 = [];
      if ("beforeSearch" in userSearchHooks) {
        const key = "beforeSearch";
        const transformedQuery = yield userSearchHooks[key](newQuery);
        if (transformedQuery) {
          newQuery = transformedQuery;
        }
      }
      const defaultSearchResult = yield (_a2 = pageSearcherRef.current) == null ? void 0 : _a2.match(newQuery);
      if (defaultSearchResult) {
        searchResult2.push(...defaultSearchResult);
      }
      if ("onSearch" in userSearchHooks) {
        const key = "onSearch";
        const customSearchResult = yield userSearchHooks[key](
          newQuery,
          searchResult2
        );
        if (customSearchResult) {
          searchResult2.push(
            ...customSearchResult.map(
              (item) => __spreadValues({
                renderType: "custom" /* Custom */
              }, item)
            )
          );
        }
      }
      if ("afterSearch" in userSearchHooks) {
        const key = "afterSearch";
        yield userSearchHooks[key](newQuery, searchResult2);
      }
      const currQuery = (_b2 = searchInputRef.current) == null ? void 0 : _b2.value;
      if (currQuery === newQuery) {
        setSearchResult(searchResult2 || DEFAULT_RESULT);
        setIsSearching(false);
      }
    }
  });
  const handleQueryChange = useDebounce(handleQueryChangedImpl);
  const normalizeSuggestions = (suggestions) => {
    return suggestions.reduce(
      (groups, item) => {
        const group = item.group;
        if (!groups[group]) {
          groups[group] = [];
        }
        groups[group].push(item);
        return groups;
      },
      {}
    );
  };
  const renderSearchResult = (result, searchOptions, isSearching2) => {
    if (result.length === 1) {
      const currentSearchResult = result[0].result;
      if (currentSearchResult.length === 0 && !isSearching2) {
        return /* @__PURE__ */ jsx55(NoSearchResult, { query });
      }
      return /* @__PURE__ */ jsx55("div", { ref: searchResultTabRef, children: renderSearchResultItem(currentSearchResult, query, isSearching2) });
    }
    const tabValues = result.map((item) => {
      if (!searchOptions || searchOptions.mode !== "remote") {
        return item.group;
      }
      const indexItem = normalizeSearchIndexes(
        searchOptions.searchIndexes || []
      ).find((indexInfo) => indexInfo.value === item.group);
      return indexItem.label;
    });
    const renderKey = "render";
    return /* @__PURE__ */ jsx55(
      Tabs2,
      {
        values: tabValues,
        tabContainerClassName: index_module_default20.tabClassName,
        onChange: (index) => {
          setResultTabIndex(index);
          setCurrentSuggestionIndex(0);
        },
        ref: searchResultTabRef,
        children: result.map((item) => /* @__PURE__ */ jsxs37(Tab3, { children: [
          item.renderType === "default" /* Default */ && renderSearchResultItem(item.result, query, isSearching2),
          item.renderType === "custom" /* Custom */ && userSearchHooks[renderKey](item.result)
        ] }, item.group))
      }
    );
  };
  const renderSearchResultItem = (suggestionList, query2, isSearching2) => {
    if (isSearching2) {
      return /* @__PURE__ */ jsx55("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsx55(SvgWrapper, { icon: LoadingSvg, className: "m-8 opacity-80" }) });
    }
    if (suggestionList.length === 0 && !initing) {
      return /* @__PURE__ */ jsx55(NoSearchResult, { query: query2 });
    }
    const normalizedSuggestions = normalizeSuggestions(suggestionList);
    let accumulateIndex = -1;
    return /* @__PURE__ */ jsx55("ul", { className: index_module_default20.suggestList, children: Object.keys(normalizedSuggestions).map((group) => {
      const groupSuggestions = normalizedSuggestions[group] || [];
      return /* @__PURE__ */ jsx55("li", { children: /* @__PURE__ */ jsx55("ul", { className: "pb-2", children: groupSuggestions.map((suggestion) => {
        accumulateIndex++;
        const suggestionIndex = accumulateIndex;
        return /* @__PURE__ */ jsx55(
          SuggestItem,
          {
            suggestion,
            isCurrent: suggestionIndex === currentSuggestionIndex,
            setCurrentSuggestionIndex: (event) => {
              if (mousePositionRef.current.pageX === event.pageX && mousePositionRef.current.pageY === event.pageY) {
                return;
              }
              setCanScroll(false);
              setCurrentSuggestionIndex(suggestionIndex);
            },
            onMouseMove: (event) => {
              mousePositionRef.current = {
                pageX: event.pageX,
                pageY: event.pageY
              };
            },
            closeSearch: () => {
              clearSearchState();
            },
            inCurrentDocIndex: resultTabIndex === 0,
            scrollTo
          },
          `${suggestion.title}-${suggestionIndex}`
        );
      }) }) }, group);
    }) });
  };
  return /* @__PURE__ */ jsx55(Fragment12, { children: focused && createPortal(
    /* @__PURE__ */ jsx55(
      "div",
      {
        className: index_module_default20.mask,
        onClick: () => {
          clearSearchState();
        },
        children: /* @__PURE__ */ jsxs37(
          "div",
          {
            className: `${index_module_default20.modal}`,
            onClick: (e) => {
              setFocused(true);
              e.stopPropagation();
            },
            children: [
              /* @__PURE__ */ jsxs37("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsxs37("div", { className: index_module_default20.inputForm, children: [
                  /* @__PURE__ */ jsx55("label", { children: /* @__PURE__ */ jsx55(SvgWrapper, { icon: SearchSvg }) }),
                  /* @__PURE__ */ jsx55(
                    "input",
                    {
                      className: `rspress-search-panel-input ${index_module_default20.input}`,
                      ref: searchInputRef,
                      placeholder: searchPlaceholderText,
                      "aria-label": "SearchPanelInput",
                      autoComplete: "off",
                      autoFocus: true,
                      onChange: (e) => handleQueryChange(e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx55("label", { children: /* @__PURE__ */ jsx55(
                    SvgWrapper,
                    {
                      icon: CloseSvg,
                      className: index_module_default20.close,
                      onClick: (e) => {
                        if (searchInputRef.current) {
                          e.stopPropagation();
                          if (!query) {
                            clearSearchState();
                          } else {
                            searchInputRef.current.value = "";
                            setQuery("");
                          }
                        }
                      }
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx55(
                  "h2",
                  {
                    className: "text-brand ml-2 sm:hidden cursor-pointer",
                    onClick: (e) => {
                      e.stopPropagation();
                      clearSearchState();
                    },
                    children: "Cancel"
                  }
                )
              ] }),
              query && !initing ? /* @__PURE__ */ jsx55(
                "div",
                {
                  className: `${index_module_default20.searchHits}  rspress-scrollbar`,
                  ref: searchResultRef,
                  children: renderSearchResult(searchResult, search, isSearching)
                }
              ) : null
            ]
          }
        )
      }
    ),
    document.getElementById("search-container")
  ) });
}

// src/components/Search/index.tsx
import { Fragment as Fragment13, jsx as jsx56, jsxs as jsxs38 } from "react/jsx-runtime";
function Search2() {
  const [focused, setFocused] = useState20(false);
  const [metaKey, setMetaKey] = useState20(null);
  const { searchPlaceholderText = "Search Docs" } = useLocaleSiteData();
  useEffect17(() => {
    setMetaKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "⌘" : "Ctrl"
    );
  }, []);
  return /* @__PURE__ */ jsxs38(Fragment13, { children: [
    /* @__PURE__ */ jsx56(
      "div",
      {
        className: `rspress-nav-search-button ${index_module_default20.navSearchButton}`,
        onClick: () => setFocused(true),
        children: /* @__PURE__ */ jsxs38("button", { children: [
          /* @__PURE__ */ jsx56(SvgWrapper, { icon: SearchSvg2, width: "18", height: "18" }),
          /* @__PURE__ */ jsx56("p", { className: index_module_default20.searchWord, children: searchPlaceholderText }),
          /* @__PURE__ */ jsxs38("div", { style: { opacity: metaKey ? 1 : 0 }, children: [
            /* @__PURE__ */ jsx56("span", { children: metaKey }),
            /* @__PURE__ */ jsx56("span", { children: "K" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx56(
      "div",
      {
        className: index_module_default20.mobileNavSearchButton,
        onClick: () => setFocused(true),
        children: /* @__PURE__ */ jsx56(SvgWrapper, { icon: SearchSvg2 })
      }
    ),
    /* @__PURE__ */ jsx56(SearchPanel, { focused, setFocused })
  ] });
}

// src/components/Sidebar/index.tsx
import { useLocation as useLocation11 } from "@rspress/runtime";
import {
  inBrowser as inBrowser3
} from "@rspress/shared";
import { useEffect as useEffect20, useState as useState21 } from "react";

// src/components/Sidebar/SidebarDivider.tsx
import { jsx as jsx57 } from "react/jsx-runtime";
function SidebarDivider(props) {
  const { depth, dividerType } = props;
  const borderTypeStyle = dividerType === "dashed" ? "border-dashed" : "border-solid";
  return /* @__PURE__ */ jsx57(
    "div",
    {
      className: `${borderTypeStyle} border-t border-divider-light my-3`,
      style: { marginLeft: depth === 0 ? 0 : "18px" }
    }
  );
}

// src/components/Sidebar/SidebarItem.tsx
import { normalizeHrefInRuntime as normalizeHref8 } from "@rspress/runtime";
import { Link as Link10, Tag as Tag4 } from "@theme";
import { useEffect as useEffect19, useRef as useRef12 } from "react";

// src/components/Sidebar/SidebarGroup.tsx
import {
  normalizeHrefInRuntime as normalizeHref7,
  useNavigate as useNavigate2,
  withBase as withBase11
} from "@rspress/runtime";
import { Tag as Tag3 } from "@theme";
import ArrowRight3 from "@theme-assets/arrow-right";
import { useEffect as useEffect18, useRef as useRef11 } from "react";

// src/components/Sidebar/index.module.scss
var index_module_default21 = { "navTitleMask": "navTitleMask_71eca", "sidebar": "sidebar_71eca", "sidebarContent": "sidebarContent_71eca", "open": "open_71eca", "menuLink": "menuLink_71eca", "menuItem": "menuItem_71eca", "collapseContainer": "collapseContainer_71eca", "menuItemActive": "menuItemActive_71eca", "menuGroupActive": "menuGroupActive_71eca" };

// src/components/Sidebar/SidebarGroup.tsx
import { jsx as jsx58, jsxs as jsxs39 } from "react/jsx-runtime";
function SidebarGroup(props) {
  var _a;
  const { item, depth = 0, activeMatcher, id, setSidebarData } = props;
  const navigate = useNavigate2();
  const containerRef = useRef11(null);
  const transitionRef = useRef11(null);
  const innerRef = useRef11(null);
  const initialRender = useRef11(true);
  const initialState = useRef11(item.collapsed);
  const active = item.link && activeMatcher(item.link);
  const { collapsed, collapsible = true } = item;
  const collapsibleIcon = /* @__PURE__ */ jsx58(
    "div",
    {
      style: {
        cursor: "pointer",
        transition: "transform 0.2s ease-out",
        transform: collapsed ? "rotate(0deg)" : "rotate(90deg)"
      },
      children: /* @__PURE__ */ jsx58(SvgWrapper, { icon: ArrowRight3 })
    }
  );
  useEffect18(() => {
    if (initialRender.current) {
      return;
    }
    if (!containerRef.current || !innerRef.current) {
      return;
    }
    if (transitionRef.current) {
      clearTimeout(transitionRef.current);
    }
    const container = containerRef.current;
    const inner = innerRef.current;
    const contentHeight = inner.clientHeight + 4;
    if (collapsed) {
      container.style.maxHeight = `${contentHeight}px`;
      container.style.transitionDuration = "0.5s";
      inner.style.opacity = "0";
      transitionRef.current = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.maxHeight = "0px";
        }
      }, 0);
    } else {
      container.style.maxHeight = `${contentHeight}px`;
      container.style.transitionDuration = "0.3s";
      inner.style.opacity = "1";
      transitionRef.current = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.removeProperty("max-height");
        }
      }, 300);
    }
  }, [collapsed]);
  useEffect18(() => {
    initialRender.current = false;
  }, []);
  const toggleCollapse = (e) => {
    e.stopPropagation();
    setSidebarData((sidebarData) => {
      const newSidebarData = [...sidebarData];
      const indexes = id.split("-").map(Number);
      const initialIndex = indexes.shift();
      const root = newSidebarData[initialIndex];
      let current = root;
      for (const index of indexes) {
        current = current.items[index];
      }
      if ("items" in current) {
        current.collapsed = !current.collapsed;
      }
      return newSidebarData;
    });
  };
  return /* @__PURE__ */ jsxs39(
    "section",
    {
      className: "rspress-sidebar-section mt-0.5 block",
      "data-context": item.context,
      style: {
        marginLeft: depth === 0 ? 0 : "18px"
      },
      children: [
        /* @__PURE__ */ jsxs39(
          "div",
          {
            className: `rspress-sidebar-collapse flex justify-between items-center ${active ? index_module_default21.menuItemActive : index_module_default21.menuItem}`,
            "data-context": item.context,
            onMouseEnter: () => item.link && preloadLink(item.link),
            onClick: (e) => {
              if (item.link) {
                navigate(withBase11(normalizeHref7(item.link)));
              }
              collapsible && toggleCollapse(e);
            },
            style: {
              borderRadius: depth === 0 ? "0 var(--rp-radius) var(--rp-radius) 0" : void 0,
              cursor: collapsible || item.link ? "pointer" : "normal"
            },
            children: [
              /* @__PURE__ */ jsxs39(
                "h2",
                {
                  className: "py-2 px-3 text-sm font-medium flex",
                  style: __spreadValues({}, depth === 0 ? highlightTitleStyle : {}),
                  children: [
                    /* @__PURE__ */ jsx58(Tag3, { tag: item.tag }),
                    /* @__PURE__ */ jsx58(
                      "span",
                      {
                        className: "flex-center",
                        style: {
                          fontSize: depth === 0 ? "14px" : "13px"
                        },
                        children: renderInlineMarkdown(item.text)
                      }
                    )
                  ]
                }
              ),
              collapsible && /* @__PURE__ */ jsx58(
                "div",
                {
                  className: `${index_module_default21.collapseContainer} p-2 rounded-xl`,
                  onClick: toggleCollapse,
                  children: collapsibleIcon
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx58(
          "div",
          {
            ref: containerRef,
            className: "transition-all duration-300 ease-in-out",
            style: {
              overflow: "hidden",
              maxHeight: initialState.current ? 0 : void 0
            },
            children: /* @__PURE__ */ jsx58(
              "div",
              {
                ref: innerRef,
                className: "rspress-sidebar-group transition-opacity duration-500 ease-in-out",
                style: {
                  opacity: initialState.current ? 0 : 1,
                  marginLeft: depth === 0 ? "12px" : 0
                },
                children: (_a = item == null ? void 0 : item.items) == null ? void 0 : _a.map(
                  (item2, index) => isSidebarDivider(item2) ? /* @__PURE__ */ jsx58(
                    SidebarDivider,
                    {
                      depth: depth + 1,
                      dividerType: item2.dividerType
                    },
                    index
                  ) : (
                    // eslint-disable-next-line react/no-array-index-key
                    /* @__PURE__ */ jsx58(
                      "div",
                      {
                        className: "rspress-sidebar-item",
                        "data-context": item2.context,
                        children: /* @__PURE__ */ jsx58(
                          SidebarItem,
                          __spreadProps(__spreadValues({}, props), {
                            item: item2,
                            depth: depth + 1,
                            id: `${id}-${index}`
                          })
                        )
                      },
                      index
                    )
                  )
                )
              }
            )
          }
        )
      ]
    },
    id
  );
}

// src/components/Sidebar/SidebarItem.tsx
import { jsx as jsx59, jsxs as jsxs40 } from "react/jsx-runtime";
function SidebarItem(props) {
  const { item, depth = 0, activeMatcher, id, setSidebarData } = props;
  const active = "link" in item && item.link && activeMatcher(item.link);
  const ref = useRef12(null);
  useEffect19(() => {
    var _a;
    if (active) {
      (_a = ref.current) == null ? void 0 : _a.scrollIntoView({
        block: "center"
      });
    }
  }, []);
  if ("items" in item) {
    return /* @__PURE__ */ jsx59(
      SidebarGroup,
      {
        id,
        activeMatcher,
        item,
        depth,
        collapsed: item.collapsed,
        setSidebarData
      },
      `${item.text}-${id}`
    );
  }
  return /* @__PURE__ */ jsx59(Link10, { href: normalizeHref8(item.link), className: index_module_default21.menuLink, children: /* @__PURE__ */ jsxs40(
    "div",
    {
      ref,
      onMouseEnter: () => preloadLink(item.link),
      className: `${active ? index_module_default21.menuItemActive : index_module_default21.menuItem} mt-0.5 py-2 px-3 font-medium flex`,
      style: __spreadValues({
        // The first level menu item will have the same font size as the sidebar group
        fontSize: depth === 0 ? "14px" : "13px",
        marginLeft: depth === 0 ? 0 : "18px",
        borderRadius: "0 var(--rp-radius) var(--rp-radius) 0"
      }, depth === 0 ? highlightTitleStyle : {}),
      children: [
        /* @__PURE__ */ jsx59(Tag4, { tag: item.tag }),
        /* @__PURE__ */ jsx59("span", { children: renderInlineMarkdown(item.text) })
      ]
    }
  ) });
}

// src/components/Sidebar/SidebarSectionHeader.tsx
import { Tag as Tag5 } from "@theme";
import { jsx as jsx60, jsxs as jsxs41 } from "react/jsx-runtime";
function SidebarSectionHeader({
  sectionHeaderText,
  tag
}) {
  return /* @__PURE__ */ jsxs41("div", { className: "rspress-sidebar-section-header", children: [
    /* @__PURE__ */ jsx60(Tag5, { tag }),
    /* @__PURE__ */ jsx60("span", { children: renderInlineMarkdown(sectionHeaderText) })
  ] });
}

// src/components/Sidebar/index.tsx
import { Fragment as Fragment14, jsx as jsx61, jsxs as jsxs42 } from "react/jsx-runtime";
var highlightTitleStyle = {
  fontSize: "14px",
  paddingLeft: "24px",
  fontWeight: "bold"
};
var bodyStyleOverflow;
var matchCache = /* @__PURE__ */ new WeakMap();
function Sidebar2(props) {
  const { isSidebarOpen, beforeSidebar, afterSidebar, uiSwitch, navTitle } = props;
  const { pathname: rawPathname } = useLocation11();
  const { items: rawSidebarData } = useSidebarData();
  const [sidebarData, setSidebarData] = useState21(() => {
    return rawSidebarData.filter(Boolean).flat();
  });
  const pathname = decodeURIComponent(rawPathname);
  const activeMatcher = useActiveMatcher();
  useEffect20(() => {
    if (inBrowser3()) {
      if (isSidebarOpen) {
        bodyStyleOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = bodyStyleOverflow || "";
      }
    }
  }, [isSidebarOpen]);
  useEffect20(() => {
    if (rawSidebarData === sidebarData) {
      return;
    }
    matchCache = /* @__PURE__ */ new WeakMap();
    const match2 = (item) => {
      if (matchCache.has(item)) {
        return matchCache.get(item);
      }
      if ("link" in item && item.link && activeMatcher(item.link)) {
        matchCache.set(item, true);
        return true;
      }
      if ("items" in item) {
        const result = item.items.some((child) => match2(child));
        if (result) {
          matchCache.set(item, true);
          return true;
        }
      }
      matchCache.set(item, false);
      return false;
    };
    const traverse = (item) => {
      if ("items" in item) {
        item.items.forEach(traverse);
        if (match2(item)) {
          item.collapsed = false;
        }
      }
    };
    const newSidebarData = rawSidebarData.filter(Boolean).flat();
    newSidebarData.forEach(traverse);
    setSidebarData(newSidebarData);
  }, [rawSidebarData, pathname]);
  return /* @__PURE__ */ jsxs42(
    "aside",
    {
      className: `${index_module_default21.sidebar} rspress-sidebar ${isSidebarOpen ? index_module_default21.open : ""}`,
      children: [
        !(uiSwitch == null ? void 0 : uiSwitch.showNavbar) ? null : /* @__PURE__ */ jsx61("div", { className: index_module_default21.navTitleMask, children: navTitle || /* @__PURE__ */ jsx61(NavBarTitle, {}) }),
        /* @__PURE__ */ jsx61("div", { className: `rspress-scrollbar ${index_module_default21.sidebarContent}`, children: /* @__PURE__ */ jsxs42("nav", { className: "pb-2", children: [
          beforeSidebar,
          /* @__PURE__ */ jsx61(
            SidebarList,
            {
              sidebarData,
              setSidebarData
            }
          ),
          afterSidebar
        ] }) })
      ]
    }
  );
}
function SidebarList({
  sidebarData,
  setSidebarData
}) {
  const activeMatcher = useActiveMatcher();
  return /* @__PURE__ */ jsx61(Fragment14, { children: sidebarData.map((item, index) => {
    return /* @__PURE__ */ jsx61(
      SidebarListItem,
      {
        item,
        index,
        setSidebarData,
        activeMatcher
      },
      index
    );
  }) });
}
function SidebarListItem(props) {
  var _a, _b;
  const { item, index, setSidebarData, activeMatcher } = props;
  if (isSidebarDivider(item)) {
    return /* @__PURE__ */ jsx61(SidebarDivider, { depth: 0, dividerType: item.dividerType }, index);
  }
  if (isSidebarSectionHeader(item)) {
    return /* @__PURE__ */ jsx61(
      SidebarSectionHeader,
      {
        sectionHeaderText: item.sectionHeaderText,
        tag: item.tag
      },
      index
    );
  }
  if (isSideBarCustomLink(item)) {
    return /* @__PURE__ */ jsx61(
      "div",
      {
        className: "rspress-sidebar-item rspress-sidebar-custom-link",
        "data-context": item.context,
        children: /* @__PURE__ */ jsx61(
          SidebarItem,
          {
            id: String(index),
            item,
            depth: 0,
            collapsed: (_a = item.collapsed) != null ? _a : true,
            setSidebarData,
            activeMatcher
          },
          index
        )
      },
      index
    );
  }
  return /* @__PURE__ */ jsx61(
    SidebarItem,
    {
      id: String(index),
      item,
      depth: 0,
      activeMatcher,
      collapsed: (_b = item.collapsed) != null ? _b : true,
      setSidebarData
    },
    index
  );
}

// src/components/SourceCode/index.tsx
import Github from "@theme-assets/github";
import Gitlab from "@theme-assets/gitlab";

// src/components/SourceCode/index.module.scss
var index_module_default22 = { "sourceCode": "sourceCode_bf1b0" };

// src/components/SourceCode/index.tsx
import { jsx as jsx62, jsxs as jsxs43 } from "react/jsx-runtime";
function SourceCode(props) {
  const { href, platform = "github" } = props;
  const { sourceCodeText = "Source" } = useLocaleSiteData();
  return /* @__PURE__ */ jsx62(
    "div",
    {
      className: `inline-block rounded border border-solid border-gray-light-3 dark:border-divider text-gray-400 ${index_module_default22.sourceCode}`,
      children: /* @__PURE__ */ jsxs43(
        "a",
        {
          href,
          target: "_blank",
          className: "flex items-center content-center transition-all duration-300 text-xs block px-2 py-1 ",
          children: [
            /* @__PURE__ */ jsx62("span", { className: "mr-2 inline-flex w-4 h-4", children: /* @__PURE__ */ jsx62(SvgWrapper, { icon: platform === "gitlab" ? Gitlab : Github }) }),
            /* @__PURE__ */ jsx62("span", { children: sourceCodeText })
          ]
        }
      )
    }
  );
}

// src/components/Steps/index.module.scss
var index_module_default23 = { "rspressSteps": "rspressSteps_38f64" };

// src/components/Steps/index.tsx
import { jsx as jsx63 } from "react/jsx-runtime";
function Steps({ children }) {
  return /* @__PURE__ */ jsx63(
    "div",
    {
      className: `ml-4 mb-11 border-l pl-6 ${index_module_default23.rspressSteps} [counter-reset:step]`,
      children
    }
  );
}

// src/components/Tag/index.tsx
import { jsx as jsx64 } from "react/jsx-runtime";
var Tag6 = ({ tag }) => {
  if (!tag) {
    return null;
  }
  const isSvgTagString = tag.trim().startsWith("<svg");
  if (isSvgTagString) {
    return /* @__PURE__ */ jsx64(
      "div",
      {
        dangerouslySetInnerHTML: { __html: tag },
        style: { width: 20, marginRight: 4 }
      }
    );
  }
  return /* @__PURE__ */ jsx64("img", { src: tag });
};

// src/components/Toc/index.tsx
import { usePageData as usePageData22 } from "@rspress/runtime";
import { jsx as jsx65 } from "react/jsx-runtime";
var TocItem = ({
  header,
  onItemClick
}) => {
  return /* @__PURE__ */ jsx65("li", { children: /* @__PURE__ */ jsx65(
    "a",
    {
      href: `#${header.id}`,
      className: "rspress-toc-link sm:text-normal text-sm",
      style: {
        marginLeft: (header.depth - 2) * 12
      },
      onClick: (e) => {
        e.preventDefault();
        window.location.hash = header.id;
        const target = document.getElementById(header.id);
        if (target) {
          scrollToTarget(target, false);
        }
        onItemClick == null ? void 0 : onItemClick(header);
      },
      children: /* @__PURE__ */ jsx65("span", { className: "rspress-toc-link-text block", children: renderInlineMarkdown(header.text) })
    }
  ) }, header.id);
};
function Toc2({
  onItemClick
}) {
  const { page } = usePageData22();
  return /* @__PURE__ */ jsx65("ul", { children: page.toc.map((item) => /* @__PURE__ */ jsx65(TocItem, { header: item, onItemClick }, item.id)) });
}

// src/index.ts
var src_default = {
  Layout,
  NotFoundLayout,
  HomeLayout,
  setup
};
export {
  Aside,
  Badge,
  Button,
  Card,
  DocFooter,
  DocLayout,
  EditLink2 as EditLink,
  HomeFeature2 as HomeFeature,
  HomeFooter2 as HomeFooter,
  HomeHero2 as HomeHero,
  HomeLayout,
  LastUpdated2 as LastUpdated,
  Layout,
  Link3 as Link,
  LinkCard,
  Nav2 as Nav,
  NotFoundLayout,
  Overview2 as Overview,
  PackageManagerTabs,
  PrevNextPage2 as PrevNextPage,
  RenderType,
  ScrollToTop2 as ScrollToTop,
  Search2 as Search,
  SearchPanel,
  Sidebar2 as Sidebar,
  SidebarList,
  SocialLinks,
  SourceCode,
  Steps,
  SwitchAppearance,
  Tab3 as Tab,
  Tabs2 as Tabs,
  Tag6 as Tag,
  Toc2 as Toc,
  bindingAsideScroll,
  src_default as default,
  getCustomMDXComponent2 as getCustomMDXComponent,
  isActive,
  isMobileDevice,
  parseInlineMarkdownText,
  renderHtmlOrText,
  renderInlineMarkdown,
  scrollToTarget,
  setup,
  useEditLink,
  useEnableNav,
  useFullTextSearch,
  useHiddenNav,
  useLocaleSiteData,
  usePathUtils,
  usePrevNextPage,
  useRedirect4FirstVisit,
  useSidebarData,
  useThemeState
};

//# sourceMappingURL=bundle.js.map