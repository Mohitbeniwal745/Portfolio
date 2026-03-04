import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export default function proxy(request: NextRequest) {
  const url = request.nextUrl
  const pathname = url.pathname

  // Handle RSS rewrites
  if (pathname === "/rss") {
    return NextResponse.rewrite(new URL("/blog/rss", request.url))
  }
  if (pathname === "/registry/rss") {
    return NextResponse.rewrite(new URL("/components/rss", request.url))
  }

  // Handle Legacy redirects
  const legacyMatch = pathname.match(
    /^\/(blog|components)\/(writing-effect-inspired-by-apple|work-experience-component|theme-switcher-component)$/
  )
  if (legacyMatch) {
    const section = legacyMatch[1]
    const legacySlug = legacyMatch[2]

    let newSlug = ""
    if (legacySlug === "writing-effect-inspired-by-apple")
      newSlug = "apple-hello-effect"
    else if (legacySlug === "work-experience-component")
      newSlug = "work-experience"
    else if (legacySlug === "theme-switcher-component")
      newSlug = "theme-switcher"

    if (newSlug) {
      return NextResponse.redirect(
        new URL(`/${section}/${newSlug}`, request.url),
        308
      )
    }
  }

  // Match /blog/:slug or /components/:slug
  const sectionMatch = pathname.match(/^\/(blog|components)\/([^/]+)$/)
  if (sectionMatch) {
    const slug = sectionMatch[2]

    // If it's a .mdx extension
    if (slug.endsWith(".mdx")) {
      const actualSlug = slug.replace(".mdx", "")
      return NextResponse.rewrite(
        new URL(`/blog.mdx/${actualSlug}`, request.url)
      )
    }

    // If accept contains text/markdown
    if (request.headers.get("accept")?.includes("text/markdown")) {
      return NextResponse.rewrite(new URL(`/blog.mdx/${slug}`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/rss", "/registry/rss", "/blog/:path*", "/components/:path*"],
}
