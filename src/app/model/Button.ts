import {IButton} from './IButton';
export class Button implements IButton {
  constructor(
    public Id?: string,
    public ButtonName?: string,
    public ButtonUrl?: string
  ){}
}
