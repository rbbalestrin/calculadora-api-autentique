import {
  Component,
  Input,
  Output,
  EventEmitter,
  Signal,
  WritableSignal,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignatureCardComponent } from "../signature-card/signature-card.component";
import { SignatoryMethod } from "../app.component";

@Component({
  selector: "app-signatures",
  standalone: true,
  imports: [CommonModule, SignatureCardComponent],
  templateUrl: "./signatures.component.html",
  styleUrl: "./signatures.component.scss",
})
export class SignaturesComponent {
  @Input() signatories: WritableSignal<SignatoryMethod[]> = signal([]);

  @Output() addSignatory = new EventEmitter<void>();
  @Output() updateSignatory = new EventEmitter<{
    index: number;
    signatory: any;
  }>();
  @Output() removeSignatory = new EventEmitter<number>();

  onAddSignatory() {
    this.addSignatory.emit();
  }

  onUpdateSignatory({
    index,
    signatory,
  }: {
    index: number;
    signatory: SignatoryMethod;
  }) {
    this.signatories.update((s: SignatoryMethod[]) => {
      const updated = [...s];
      updated[index] = signatory;
      return updated;
    });
  }

  onRemoveSignatory(index: number) {
    this.removeSignatory.emit(index);
  }
}
