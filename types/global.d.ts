// Global type augmentations for the portfolio project

// Allow CSS file imports (side-effect imports)
declare module '*.css' {
  const content: Record<string, string>
  export default content
}

// Allow SVG imports
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>
  export default content
}
