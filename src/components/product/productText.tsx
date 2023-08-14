import { ElementType } from "react"

interface IProductText {
  text: string,
  Tag: ElementType,
  className?: string
} 

export default function ProductText({ text, Tag, className }: IProductText) {
  return (
    <Tag className={className}>
      {text}
    </Tag>
  )
}
