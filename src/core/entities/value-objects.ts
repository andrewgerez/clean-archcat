import { UniqueEntityID } from './unique-entity-id'

export abstract class ValueObject<Props> {
  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
  }

  public equals(vo: ValueObject<unknown>) {
    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.props === undefined) {
      return false
    }

    return JSON.stringify(vo.props) === JSON.stringify(this.props)
  }
}
