import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyOutputType, ToasterConfig } from 'angular2-toaster';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kinnect-assignment';
  public firstNumber: any = null;
  public secondNumber: any = null;
  public mathsForm: FormGroup;
  public interval: any;
  public timeTaken: any = 0;
  public timeLog: any = [];
  public averageTime: any = 0;
  public config: ToasterConfig = new ToasterConfig({
    limit: 1,
    preventDuplicates: true,
    bodyOutputType: BodyOutputType.TrustedHtml
  });

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService
  ) {
    this.mathsForm = this.fb.group({
      answer: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    // Call generate random number function
    this.generateRandomNumbers();
    // Call start timer function
    this.startTimer();
  }

  // This function gets called when user give answer
  submitForm() {
    if (this.mathsForm.valid) {
      const answer = this.mathsForm.controls.answer.value;
      const actualAnswer = this.firstNumber + this.secondNumber;

      // Check users answer with correct answer
      if ( parseInt(answer) === actualAnswer) {
        // reset form
        this.mathsForm.reset();
        // Call generate random numbers function again
        this.generateRandomNumbers();
        // Call stop timer function
        this.stopTime()
        this.utilService.showSuccess('Hurray', 'Your answer is correct !!');
      } else {
        this.utilService.showError('Error', 'Answer is incorrect !!')
      }
    }
  }

  generateRandomNumbers() {
    this.firstNumber = Math.floor(Math.random() * 10);
    this.secondNumber = Math.floor(Math.random() * 10);
  }

  // Start time function
  startTimer() {
    this.interval = setInterval(() => {
     this.timeTaken ++;
    }, 1000);
  }

  // Stop timer function
  stopTime() {
    // push the answer time in array
    this.timeLog.push(this.timeTaken);

    // reset the time
    this.timeTaken = 0;
    // reset the interval
    clearInterval(this.interval);
    // call average function
    this.average();
    // call start timer function
    this.startTimer();
  }

  // Function to find average of time taken
  average() {
    const sum = this.timeLog.reduce((a, b) => a + b, 0);
    const avg = (sum / this.timeLog.length) || 0;
    this.averageTime = avg.toFixed(2);
  }


  // This function is for restrict user to enter character as answer
  public restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
     return false;
    }
    if (e.which === 0) {
     return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
   }
}
