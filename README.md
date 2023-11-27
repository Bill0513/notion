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

### 接入clerk

clerk官网：https://dashboard.clerk.com/

1. 安装：`npm install @clerk/clerk-react`

2. 将clerk的API Keys复制到项目的.env.local中

![image-20231119142414811](https://keson-1308969971.cos.ap-shanghai.myqcloud.com/uPic/image-20231119142414811.png)



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

