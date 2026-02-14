
import ReactMarkdown from 'react-markdown'

export interface QuestionBoardSchema {
  question: string
}

export default function QuestionBoard({ question }: QuestionBoardSchema) {
  // Dedent the content — remove common leading whitespace from template literals
  const dedented = question
    .split('\n')
    .map(line => line.replace(/^      /, ''))  // remove up to 6 spaces of indentation
    .join('\n')
    .trim();

  return (
    <div className="markdown-content">
      <ReactMarkdown>
        {dedented}
      </ReactMarkdown>
    </div>
  )
}