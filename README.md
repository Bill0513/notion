# 创建next.js

```js
要求node >= 18

创建：npx create-next-app my-nextjs-app

启动：yarn dev
```

# UI

练手的notion项目采用的是`shadcn/ui`，具体网页是https://ui.shadcn.com/docs/installation/next

## UI安装

```js
npx shadcn-ui@latest init
```

在安装过程中，会出现下列的终端选项：

![image-20231119120616778](https://keson-1308969971.cos.ap-shanghai.myqcloud.com/uPic/image-20231119120616778.png)

## UI组件添加

```js
npx shadcn-ui@latest add button
```



## 全局错误页面

`/app/error.tsx`

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error.png"
        height="300"
        width="300"
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        height="300"
        width="300"
        alt="Error"
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
```





## 全局css样式

```css
html,
body,
:root {
  height: 100%;
}
```



## 全局主题配置

官网具体配置：https://ui.shadcn.com/docs/dark-mode/next

在代码中具体实现步骤：

1. `components/providers/theme-provider.tsx`

   1. ```tsx
      "use client";
      
      import * as React from "react";
      import { ThemeProvider as NextThemesProvider } from "next-themes";
      import { type ThemeProviderProps } from "next-themes/dist/types";
      
      export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
        return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
      }
      
      ```

2. `app/layout.tsx`

   1. ```tsx
      import type { Metadata } from "next";
      import { Inter } from "next/font/google";
      import "./globals.css";
      import { ThemeProvider } from "@/components/providers/theme-provider";
      import { ConvexClientProvider } from "@/components/providers/convex-provider";
      
      const inter = Inter({ subsets: ["latin"] });
      
      export const metadata: Metadata = {
        title: "Jotion",
        description: "The connected workspace where better,fatser work happens",
        icons: {
          icon: [
            {
              media: "(prefers-color-scheme: light)",
              url: "/logo.svg",
              href: "/logo.svg",
            },
            {
              media: "(prefers-color-scheme: dark)",
              url: "/logo-dark.svg",
              href: "/logo-dark.svg",
            },
          ],
        },
      };
      
      export default function RootLayout({
        children,
      }: {
        children: React.ReactNode;
      }) {
        return (
          <html lang="en" suppressContentEditableWarning>
            <body className={inter.className}>
              <ConvexClientProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                  storageKey="jotion-theme"
                >
                  {children}
                </ThemeProvider>
              </ConvexClientProvider>
            </body>
          </html>
        );
      }
      
      ```

3. `components/mode-toggle.tsx`

   1. ```tsx
      "use client";
      
      import * as React from "react";
      import { Moon, Sun } from "lucide-react";
      import { useTheme } from "next-themes";
      
      import { Button } from "@/components/ui/button";
      import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
      } from "@/components/ui/dropdown-menu";
      
      export function ModeToggle() {
        const { setTheme } = useTheme();
      
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
      ```

# 路由

在app目录的非`(xxx)`与非`_xxx`文件夹就是具体的路由。

1. `(xxx)`这样的路径代表是一个结构，并不会被解析成`URL`
2. `_xxx`这样的路径代表不会被解析成`URL`
3. 每一个路由文件夹都有一个`page.tsx`与`layout.tsx`，`layout.tsx`会被编译成该路由页面的外部架构，`page.tsx`才是真正展示的路由页面内容
4. `layout.tsx`展示：![image-20231119121110244](https://keson-1308969971.cos.ap-shanghai.myqcloud.com/uPic/image-20231119121110244.png)

5. `page.tsx`展示：![image-20231119121156231](https://keson-1308969971.cos.ap-shanghai.myqcloud.com/uPic/image-20231119121156231.png)

# 特殊语法

```tsx
"use client"; // 表示是客户端的页面
import Image from "next/image"; // 图片组件
import Link from "next/link"; // 跳转组件，封装了a标签

const sidebarRef = useRef<ElementRef<"aside">>(null); // 给元素打ref
```

# 特殊方法

# 封装组件

## Spinner

1. 代码：

```tsx
import { Loader } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}
export const Spinner = ({ size }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size }))}></Loader>;
};
```

2. 解析

```md
这段代码定义了一个名为 Spinner 的 React 组件，该组件使用了 Lucide React 中的 Loader 组件，结合 class-variance-authority 和 cn（可能是 classnames 库的简写）工具来处理组件的变体（variants）和动态类名。

让我解释一下代码的主要部分：

cv 和 type VariantProps: 这部分使用了 class-variance-authority 中的 cva 函数，用于处理变体。通过定义 spinnerVariants 对象，定义了不同大小的变体。VariantProps 则是用于类型约束的接口。

interface SpinnerProps: 这个接口定义了 Spinner 组件的属性，属性的类型根据 spinnerVariants 的定义而来。这样可以确保在使用 Spinner 组件时，传入的属性符合预期的类型。

Loader 组件： 这里使用了 Lucide React 中的 Loader 组件，可能用于显示加载中的动画。

return <Loader className={cn(spinnerVariants({ size }))}></Loader>;: 这里通过 cn 函数来合并动态类名，确保 Loader 组件的类名正确。spinnerVariants({ size }) 用于根据传入的 size 属性选择合适的变体类名。

总体而言，这段代码的作用是创建一个 Spinner 组件，该组件可以根据传入的 size 属性选择不同大小的加载动画，同时使用了 Lucide React 提供的 Loader 组件。
```



# HOOK

## use-scroll-top

1. 代码：

```jsx
import { useState, useEffect } from "react";

export const useScrollTop = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrolled;
};
```

2. 解析：

```md
这段代码定义了一个名为 useScrollTop 的自定义 Hook，用于检测页面滚动是否超过指定的阈值，并返回一个布尔值来表示是否滚动超过了阈值。

让我解释一下这个 Hook 的实现：

useState 用于在组件中创建一个状态变量 scrolled 和对应的更新函数 setScrolled，初始值为 false。这个状态变量表示页面是否滚动超过了阈值。

useEffect 用于在组件挂载时添加滚动事件监听器，并在组件卸载时移除事件监听器。

在 handleScroll 函数中，通过 window.scrollY 获取当前页面的垂直滚动偏移量。如果偏移量大于阈值 threshold，则调用 setScrolled(true)，表示页面已经滚动超过了阈值；否则，调用 setScrolled(false)，表示页面没有滚动超过阈值。

在 useEffect 的依赖数组中，只有 threshold 一个依赖，这表示只有在 threshold 发生变化时才重新注册滚动事件监听器。

return () => { window.removeEventListener("scroll", handleScroll); }; 表示在组件卸载时，移除滚动事件监听器，以防止内存泄漏。

最后，return scrolled; 语句返回当前页面是否滚动超过阈值的布尔值。

这个自定义 Hook 可以在你的 React 组件中使用，以方便地检测页面滚动是否超过了指定的阈值。
```

### use-origin

1. 代码：

```tsx
import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return "";
  }

  return origin;
};
```

2. 解析

```tsx

这段代码定义了一个自定义 Hook useOrigin，该 Hook 用于获取当前页面的 origin。让我来解释一下代码的逻辑：

useEffect 用于在组件挂载后设置 mounted 状态为 true，表示组件已经挂载。

origin 变量通过检测 window 对象是否存在以及是否支持 window.location.origin 来获取当前页面的 origin。如果支持，就直接使用 window.location.origin，否则为空字符串。

在组件未挂载（!mounted）时，返回空字符串。

如果组件已经挂载，返回获取到的 origin。

这样，使用这个 Hook 的组件在需要获取当前页面的 origin 时，可以调用 useOrigin 来获取。这个 Hook 的设计是为了确保在组件挂载后再获取 origin，以避免在服务器端渲染时无法访问 window 对象的问题。
```



### use-cover-image

1. 代码

```tsx
import { create } from "zustand";

type CoverImageStore = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

export const useCoverImage = create<CoverImageStore>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true, url: undefined }),
  onClose: () =>
    set({
      isOpen: false,
      url: undefined,
    }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}));
```

2. 解析：

```tsx
这段代码定义了一个基于 Zustand 的状态管理 Hook useCoverImage，用于管理封面图片相关的状态。让我来解释一下代码的逻辑：

useCoverImage 使用 create 函数创建一个状态管理 Hook，其中包含了以下状态和操作：

url: 用于存储封面图片的 URL，初始值为 undefined。
isOpen: 用于表示封面图片选择模态框是否打开，初始值为 false。
onOpen: 打开模态框的操作，将 isOpen 设置为 true，并将 url 设置为 undefined。
onClose: 关闭模态框的操作，将 isOpen 和 url 都设置为 undefined。
onReplace: 替换封面图片的操作，将 isOpen 设置为 true，并将传入的 url 设置为新的封面图片 URL。
create 函数的回调函数中通过 set 方法定义了上述状态和操作的初始值和行为。

这样，使用这个 Hook 的组件可以通过调用其中的操作来管理封面图片的状态，例如打开/关闭模态框，替换封面图片等。这是一种轻量级的状态管理方式，适用于小型的状态管理需求。
```



### use-search

1. 代码

```tsx
import { create } from "zustand";

type SearchStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

export const useSearch = create<SearchStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}));

```

2. 解析

```tsx
create 函数： create 函数是 Zustand 提供的用于创建状态容器的函数。它接受一个函数参数，这个函数用于定义状态和操作状态的方法。

SearchStore 类型： 这是状态的类型定义。它描述了状态对象的结构，包括 isOpen（表示搜索是否打开）、onOpen（打开搜索的方法）、onClose（关闭搜索的方法）、toggle（切换搜索状态的方法）。

useSearch Hook： 这个 Hook 是通过 create 函数创建的。它返回一个包含状态和操作状态方法的对象。

isOpen 表示搜索是否打开。
onOpen 是一个函数，调用它会将 isOpen 设置为 true，表示打开搜索。
onClose 是一个函数，调用它会将 isOpen 设置为 false，表示关闭搜索。
toggle 是一个函数，调用它会切换 isOpen 的值，如果是打开状态则关闭，反之亦然。
```







## Provider 提供者注入配置

### modal-provider

模态框提供者 (`ModalProvider`)，负责渲染应用中的设置模态框 (`SettingsModal`) 和封面图片模态框 (`CoverImageModal`)。

```tsx
"use client";

import { useEffect, useState } from "react";

import { SettingsModal } from "@/components/modals/settings-modal";
import { CoverImageModal } from "@/components/modals/cover-image-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
```



### theme-provider

这段代码定义了一个 `ThemeProvider` 组件，它使用了 Next.js 的 `next-themes` 库中的 `ThemeProvider`。这个组件的作用是为应用提供主题切换的功能。

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```





## 骨架屏 Skeleton 使用

1. 加载骨架屏组件

   ```tsx
   import { Skeleton } from "@/components/ui/skeleton";
   ```

2. 给某个组件定义骨架屏

   ```tsx
   Menu.Skeleton = function MenuSkeleton() {
     return <Skeleton className="w-10 h-10" />;
   };
   ```

3. 定义骨架屏使用时的场景

   在接口还没有返回值时，直接返回骨架屏，如果接口挂了，就不渲染页面了

   ```tsx
     const document = useQuery(api.documents.getById, {
       documentId: params.documentId as Id<"documents">,
     });
   
     if (document === undefined) {
       return (
         <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
           <Title.Skeleton />
           <div className="flex items-center gap-x-2">
             <Menu.Skeleton />
           </div>
         </nav>
       );
     }
   
     if (document === null) {
       return null;
     }
   ```

   



# 后端

本练手项目接入convex，在线的后端服务

convex官网：https://dashboard.convex.dev/t/bill0513

### 接入：

```js
cd my-app && npm install convex
```

### 启动：

```js
npx convex dev
```

启动后，会自动生成.env.local的配置

![image-20231119142137173](https://keson-1308969971.cos.ap-shanghai.myqcloud.com/uPic/image-20231119142137173.png)

### 注入配置

`components/providers/convex-provider.tsx`

```tsx
"use client";

import React from "react";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

```

### 启动配置

`app/layout.tsx`

<img src="https://keson-1308969971.cos.ap-shanghai.myqcloud.com/uPic/image-20231119142030872.png" alt="image-20231119142030872" style="zoom: 50%;" />

### 定义数据库

`/convex/schema.ts`

```ts
import { defineSchema, defineTable } from 'convex/server';

import { v } from 'convex/values'

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        isArchived: v.boolean(),
        parentDocument: v.optional(v.id('documents')),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.boolean()
    })
        .index('by_user', ['userId']) // 建立索引
        .index('by_user_parent', ['userId', 'parentDocument']) // 建立索引
})
```

解析：

```tsx
defineSchema 和 defineTable 函数： 这两个函数是 Convex 提供的用于定义数据库模型的工具。defineSchema 用于定义整个数据库模型的架构，而 defineTable 用于定义具体的表。

documents 表： 这是数据库模型中的一个表，通过调用 defineTable 来定义。该表具有以下字段：

title: 字符串类型，表示文档的标题。
userId: 字符串类型，表示用户的标识。
isArchived: 布尔类型，表示文档是否已归档。
parentDocument: 可选的文档 ID，表示父文档的标识。
content: 可选的字符串类型，表示文档的内容。
coverImage: 可选的字符串类型，表示文档的封面图像。
icon: 可选的字符串类型，表示文档的图标。
isPublished: 布尔类型，表示文档是否已发布。
索引： 使用 .index 方法为表添加了两个索引：

'by_user' 索引，索引了 userId 字段，用于加速按用户 ID 查询。
'by_user_parent' 索引，索引了 userId 和 parentDocument 字段，用于加速按用户 ID 和父文档 ID 查询。
```





### 定义接口

1. 获取用户信息

   ```tsx
   const identity = await ctx.auth.getUserIdentity();
   
       if (!identity) {
         throw new Error("Not authenticated");
       }
   
       const userId = identity.subject;
   ```

2. 查询

   ```tsx
   export const getSidebar = query({
     args: {
       parentDocument: v.optional(v.id("documents")),
     },
     handler: async (ctx, args) => {
       const identity = await ctx.auth.getUserIdentity();
   
       if (!identity) {
         throw new Error("Not authenticated");
       }
   
       const userId = identity.subject;
   
       const documents = await ctx.db
         .query("documents")
         .withIndex("by_user_parent", (q) =>
           q.eq("userId", userId).eq("parentDocument", args.parentDocument)
         )
         .filter((q) => q.eq(q.field("isArchived"), false))
         .order("desc")
         .collect();
   
       return documents;
     },
   });
   ```

3. 新增

   ```tsx
   export const create = mutation({
     args: {
       title: v.string(),
       parentDocument: v.optional(v.id("documents")),
     },
     handler: async (ctx, args) => {
       const identity = await ctx.auth.getUserIdentity();
   
       if (!identity) {
         throw new Error("Not authenticated");
       }
   
       const userId = identity.subject;
   
       const document = await ctx.db.insert("documents", {
         title: args.title,
         parentDocument: args.parentDocument,
         userId,
         isArchived: false,
         isPublished: false,
       });
   
       return document;
     },
   });
   ```

4. 删除

   ```tsx
   export const remove = mutation({
     args: { id: v.id("documents") },
     handler: async (ctx, args) => {
       const identity = await ctx.auth.getUserIdentity();
   
       if (!identity) {
         throw new Error("Not authenticated");
       }
   
       const userId = identity.subject;
   
       const existingDocument = await ctx.db.get(args.id);
   
       if (!existingDocument) {
         throw new Error("Not found");
       }
   
       if (existingDocument.userId !== userId) {
         throw new Error("Unauthorized");
       }
   
       const document = await ctx.db.delete(args.id);
   
       return document;
     },
   });
   ```

5. 更新

   ```tsx
   export const update = mutation({
     args: {
       id: v.id("documents"),
       title: v.optional(v.string()),
       content: v.optional(v.string()),
       coverImage: v.optional(v.string()),
       icon: v.optional(v.string()),
       isPublished: v.optional(v.boolean()),
     },
     handler: async (ctx, args) => {
       const identity = await ctx.auth.getUserIdentity();
   
       if (!identity) {
         throw new Error("Not authenticated");
       }
   
       const userId = identity.subject;
   
       const { id, ...rest } = args;
   
       const existingDocument = await ctx.db.get(id);
   
       if (!existingDocument) {
         throw new Error("Not found");
       }
   
       if (existingDocument.userId !== userId) {
         throw new Error("Unauthorized");
       }
   
       const document = await ctx.db.patch(id, {
         ...rest,
       });
   
       return document;
     },
   });
   ```



6. 递归操作

   ```tsx
   export const restore = mutation({
     args: { id: v.id("documents") },
     handler: async (ctx, args) => {
       const identity = await ctx.auth.getUserIdentity();
   
       if (!identity) {
         throw new Error("Not authenticated");
       }
   
       const userId = identity.subject;
   
       const existingDocument = await ctx.db.get(args.id);
   
       if (!existingDocument) {
         throw new Error("Not found");
       }
   
       if (existingDocument.userId !== userId) {
         throw new Error("Unauthorized");
       }
   
       const recursiveRestore = async (documentId: Id<"documents">) => {
         const children = await ctx.db
           .query("documents")
           .withIndex("by_user_parent", (q) =>
             q.eq("userId", userId).eq("parentDocument", documentId)
           )
           .collect();
   
         for (const child of children) {
           await ctx.db.patch(child._id, {
             isArchived: false,
           });
   
           await recursiveRestore(child._id);
         }
       };
   
       const options: Partial<Doc<"documents">> = {
         isArchived: false,
       };
   
       if (existingDocument.parentDocument) {
         const parent = await ctx.db.get(existingDocument.parentDocument);
         if (parent?.isArchived) {
           options.parentDocument = undefined;
         }
       }
   
       const document = await ctx.db.patch(args.id, options);
   
       recursiveRestore(args.id);
   
       return document;
     },
   });
   
   // 解析如下：
   
   /* 参数： 接受一个参数 id，该参数是文档的标识，类型为 v.id("documents")，表示这是一个文档的标识。
   
   异步处理函数： 使用 handler 定义了异步处理函数，该函数在执行 mutation 时被调用。
   
   身份验证： 使用 ctx.auth.getUserIdentity() 获取用户身份信息，如果用户未经身份验证，则抛出错误 "Not authenticated"。
   
   获取用户 ID： 从用户身份信息中提取用户 ID。
   
   获取文档： 使用 ctx.db.get(args.id) 获取待恢复的文档。如果文档不存在，则抛出错误 "Not found"。
   
   权限验证： 检查文档的用户 ID 是否与当前用户的 ID 匹配，如果不匹配，则抛出错误 "Unauthorized"。
   
   递归恢复： 定义了 recursiveRestore 函数，该函数用于递归地恢复文档及其子文档。首先通过 ctx.db.query 查询具有特定用户 ID 和父文档 ID 的子文档，并使用 .collect() 收集结果。
   
   遍历子文档： 使用 for...of 遍历查询到的子文档数组，并通过 ctx.db.patch 将其 isArchived 设置为 false，表示取消归档。
   
   递归调用： 对每个子文档都递归调用 recursiveRestore，以确保子文档及其所有后代文档都被恢复。
   
   构建选项： 定义了 options 对象，其中包含 isArchived: false，表示将文档的 isArchived 设置为 false，即取消归档。
   
   处理父文档： 如果文档有父文档，并且该父文档已经被归档，则将 options.parentDocument 设置为 undefined，表示取消父文档的关联。
   
   执行 patch： 使用 ctx.db.patch(args.id, options) 执行更新文档的操作，取消归档并可能取消与父文档的关联。
   
   递归调用主文档： 最后，通过调用 recursiveRestore(args.id) 递归调用以处理主文档及其子文档。
   
   返回文档： 返回最终更新后的文档。 */
   ```



### 使用接口

```tsx
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

const archive = useMutation(api.documents.archive);

const promise = archive({ id: documentId });
```



## 全局提示 sonner

与接口一起使用

```tsx
import { toast } from "sonner";  

const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });

    router.push("/documents");
  };
```



### 接入clerk

clerk官网：https://dashboard.clerk.com/

1. 安装：`npm install @clerk/clerk-react`

2. 将clerk的API Keys复制到项目的.env.local中

![image-20231119142414811](https://keson-1308969971.cos.ap-shanghai.myqcloud.com/uPic/image-20231119142414811.png)







## 上传文件 edgestore

edgestore文档：https://edgestore.dev/docs/quick-start

1. 安装依赖

2. 创建一个项目的仓库，将keys复制到项目的`.env.local`中 

   ![image-20231211111055233](https://keson-1308969971.cos-website.ap-shanghai.myqcloud.com/uPic/image-20231211111055233.png)

3. 在`src/app/api/edgestore/[...edgestore]/route.ts`文件中写入下列代码。

   ```tsx
   import { initEdgeStore } from "@edgestore/server";
   import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
   const es = initEdgeStore.create();
   /**
    * This is the main router for the Edge Store buckets.
    */
   const edgeStoreRouter = es.router({
     publicFiles: es.fileBucket().beforeDelete(({ ctx, fileInfo }) => {
       console.log("beforeDelete", ctx, fileInfo);
       return true; // 允许删除
     }),
   });
   const handler = createEdgeStoreNextHandler({
     router: edgeStoreRouter,
   });
   export { handler as GET, handler as POST };
   /**
    * This type is used to create the type-safe client for the frontend.
    */
   export type EdgeStoreRouter = typeof edgeStoreRouter;
   
   ```

4. 在`src/lib/edgestore.ts`文件中写入下列代码

   ```tsx
   'use client';
    
   import { type EdgeStoreRouter } from '../app/api/edgestore/[...edgestore]/route';
   import { createEdgeStoreProvider } from '@edgestore/react';
    
   const { EdgeStoreProvider, useEdgeStore } =
     createEdgeStoreProvider<EdgeStoreRouter>();
    
   export { EdgeStoreProvider, useEdgeStore };
   ```

5. 在`src/app/layout.tsx`文件中放入`EdgeStoreProvider`

   <img src="https://keson-1308969971.cos-website.ap-shanghai.myqcloud.com/uPic/image-20231211111550370.png" alt="image-20231211111550370" style="zoom:67%;" />

6. 使用edgestore上传

   ```tsx
   import { useEdgeStore } from '../lib/edgestore';
   
   const { edgestore } = useEdgeStore();
   
   const res = await edgestore.publicFiles.upload({ // 上传
                 file,
                 onProgressChange: (progress) => { // 进度
                   // you can use this to show a progress bar
                   console.log(progress);
                 },
               });
         await edgestore.publicFiles.delete({ // 删除
           url: url,
         });
         const res = await edgestore.publicFiles.upload({ // 上传并且替换新的文件，replaceTargetUrl可以为undefined
           file,
           options: {
             replaceTargetUrl: coverImage.url,
           },
         });
   ```

   



### 校验是否登录

具体auth接入流程：https://docs.convex.dev/auth/clerk

```tsx
"use client";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth(); // 解构出是否登录

  return (
    {/* loading动画 */}
        {isLoading && <Spinner></Spinner>}
        {/* 未登录 */}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Jotion Free</Button>
            </SignInButton>
          </>
        )}
        {/* 已登录 */}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/document">Enter Jotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
  );
};

```





## 使用vercel进行发布

vercel官网：https://vercel.com/kesons-projects/note-app，vercel可以直接连接到github的仓库，最好都是公有仓库，如果是私有仓库，应该还需要auth的校验。

convex 文档的配置发布配置：https://docs.convex.dev/production/hosting/vercel

1. Build command 配置成 `npx convex deploy --cmd 'npm run build'`

   <img src="https://keson-1308969971.cos-website.ap-shanghai.myqcloud.com/uPic/image-20231211105550567.png" alt="image-20231211105550567" style="zoom:50%;" />

2. 在vercel配置环境变量时，增加环境变量 `CONVEX_DEPLOY_KEY` , 这个key对应的value需要在convex生产的setting里面生成一个key。

   ![image-20231211105804727](https://keson-1308969971.cos-website.ap-shanghai.myqcloud.com/uPic/image-20231211105804727.png)

3. 在vercel配置环境变量时，将这个`NEXT_PUBLIC_CONVEX_URL`配置成convcx上图的prod url

   ![image-20231211110046146](https://keson-1308969971.cos-website.ap-shanghai.myqcloud.com/uPic/image-20231211110046146.png)

4. 保证项目在本地build时没有任何报错。那么就可以直接save后进行发布了。
