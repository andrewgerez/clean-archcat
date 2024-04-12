import { ValueObject } from '@/core/entities/value-objects'

export interface CommentWithAutorProps {
  commentId: string
  content: string
  author: string
  authorId: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CommentWithAutor extends ValueObject<CommentWithAutorProps> {
  get commentId() {
    return this.props.commentId
  }

  get content() {
    return this.props.content
  }

  get author() {
    return this.props.author
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: CommentWithAutorProps) {
    return new CommentWithAutor(props)
  }
}
