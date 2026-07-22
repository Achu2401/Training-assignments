import type { ReactNode, ReactElement } from 'react'

/*
Research 1: React.FC

React.FC is a generic type used to define function components.
It automatically includes the children prop.
Typing the props parameter directly is simpler and is the preferred
approach in modern React because it only includes the props you define.
*/

/*
Research 2: PropsWithChildren

PropsWithChildren automatically adds the children prop to your props type.
It is similar to manually writing children: ReactNode, but saves some typing.
*/

interface PageLayoutProps {
  header: ReactNode
  children: ReactNode
  footer: ReactNode
}

function PageLayout({
  header,
  children,
  footer,
}: PageLayoutProps) {
  return (
    <div>
      <header
        style={{
          background: '#f0f0f0',
          padding: '12px',
        }}
      >
        {header}
      </header>

      <main
        style={{
          padding: '16px',
        }}
      >
        {children}
      </main>

      <footer
        style={{
          background: '#f0f0f0',
          padding: '12px',
        }}
      >
        {footer}
      </footer>
    </div>
  )
}

/*
children vs named props

children is used for the main content placed between the opening
and closing tags of a component.

Named props like header and footer are useful when a component has
multiple fixed areas that require different content.
*/

interface WrapperProps {
  content: ReactNode
}

function Wrapper({ content }: WrapperProps) {
  return <div>{content}</div>
}

interface IconButtonProps {
  icon: ReactElement
  label: string
}

function IconButton({ icon, label }: IconButtonProps) {
  return (
    <button>
      {icon} {label}
    </button>
  )
}

interface TooltipProps {
  trigger: ReactElement
  tip: string
}

function Tooltip({ trigger, tip }: TooltipProps) {
  return <span title={tip}>{trigger}</span>
}

/*
ReactNode vs ReactElement

ReactNode:
Accepts anything React can render.

ReactElement:
Accepts only JSX elements.

JSX.Element:
Very similar to ReactElement, but often used as the return type of a component.
*/

function SelfLearning() {
  return (
    <div>
      <PageLayout
        header={<h1>Intern Dashboard</h1>}
        footer={<p>© 2026 Aarvihsolutions</p>}
      >
        <p>Main content goes here as children.</p>
        <p>Any JSX works — text, elements, or other components.</p>
      </PageLayout>

      <hr />

      <Wrapper content="Hello ReactNode" />

      <Wrapper content={<strong>Hello JSX</strong>} />

      <IconButton
        icon={<span>★</span>}
        label="Favourite"
      />

      <Tooltip
        trigger={<button>Hover Me</button>}
        tip="Tooltip Example"
      />

      {/*
      Error Example:

      <IconButton icon="★" label="Favourite" />

      TypeScript Error:
      Type 'string' is not assignable to type 'ReactElement'.
      */}

      {/*
      Error Example:

      <Tooltip trigger={null} tip="Tooltip" />

      TypeScript Error:
      Type 'null' is not assignable to type 'ReactElement'.
      */}
    </div>
  )
}

export default SelfLearning