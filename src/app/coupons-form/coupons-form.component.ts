import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

interface coupon {
  name: string;
  offer: string;
}

interface couponAvailability {
  name: string;
  value: boolean;
}

interface couponStatus {
  name: string;
  value: boolean;
}

interface discountType {
  name: string;
  offer: string;
}
@Component({
  selector: 'app-coupons-form',
  templateUrl: './coupons-form.component.html',
  styleUrls: ['./coupons-form.component.scss'],
})
export class CouponsFormComponent implements OnInit {
  couponsFormGroup: FormGroup;
  isRequiredField: boolean = true;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  coupon: coupon[] = [
    { name: 'First', offer: '25%' },
    { name: 'Second', offer: '40%' },
    { name: 'Third', offer: '50%' },
    { name: 'Fourth', offer: '60%' },
  ];
  couponAvailbility: couponAvailability[] = [
    { name: 'Unlimited-true', value: true },
    { name: 'Unlimited-false', value: false },
  ];
  couponStatus: couponStatus[] = [
    { name: 'Active', value: true },
    { name: 'In-Active', value: false },
  ];
  discountType: discountType[] = [
    { name: 'First', offer: '25%' },
    { name: 'Second', offer: '40%' },
    { name: 'Third', offer: '50%' },
    { name: 'Fourth', offer: '60%' },
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setUpCouponsForm();
  }

  setUpCouponsForm(): void {
    this.couponsFormGroup = this.fb.group({
      couponType: ['', Validators.required],
      couponCode: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      couponAvailability: ['', Validators.required],
      tnc: ['', Validators.required],
      couponStatus: ['', Validators.required],
      // couponRules: new FormArray([]),
      couponRules: this.fb.array([
        this.fb.group({
          minAmmount: new FormControl('', [Validators.required]),
          maxAmmount: new FormControl(''),
          discountType: new FormControl('', [Validators.required]),
          discountAmmount: new FormControl(''),
          maxDiscountAmmount: new FormControl(''),
        }),
      ]),
    });
  }

  get couponRules() {
    return this.couponsFormGroup.get('couponRules') as FormArray;
  }

  add() {
    console.log(this.couponRules.controls);
    this.couponRules.push(
      this.fb.group({
        minAmmount: new FormControl('', [Validators.required]),
        maxAmmount: new FormControl(''),
        discountType: new FormControl('', [Validators.required]),
        discountAmmount: new FormControl(''),
        maxDiscountAmmount: new FormControl(''),
      })
    );
  }

  // convenience getter for easy access to form fields
  get couponsFormControl(): { [key: string]: AbstractControl } {
    return this.couponsFormGroup.controls;
  }

  dateChange(event: MatDatepickerInputEvent<Date>): void {
    console.log(event);
  }
  dat(event: MatDatepickerInputEvent<Date>): void {
    console.log(event);
  }

  submit(): any {
    let obj = {};
    if (this.couponsFormControl['couponAvailability'].value?.value === true) {
      obj = {
        coupon_type: this.couponsFormControl['couponType'].value,
        coupon_code: this.couponsFormControl['couponCode'].value,
        valid_from: this.couponsFormControl['startDate'].value,
        valid_to: this.couponsFormControl['endDate'].value,
        is_unlimited: this.couponsFormControl['couponAvailability'].value,
        tnc: this.couponsFormControl['tnc'].value,
        is_active: this.couponsFormControl['couponStatus'].value,
        coupon_count: this.couponsFormControl?.couponRules?.value?.length,
        rules: this.couponsFormControl['couponRules'].value,
      };
    }
    if (this.couponsFormControl['couponAvailability'].value?.value === false) {
      obj = {
        coupon_type: this.couponsFormControl['couponType'].value,
        coupon_code: this.couponsFormControl['couponCode'].value,
        valid_from: this.couponsFormControl['startDate'].value,
        valid_to: this.couponsFormControl['endDate'].value,
        is_unlimited: this.couponsFormControl['couponAvailability'].value,
        tnc: this.couponsFormControl['tnc'].value,
        is_active: this.couponsFormControl['couponStatus'].value,
        rules: this.couponsFormControl['couponRules'].value,
      };
    }
    alert(obj);
    console.log(obj);
  }
}
