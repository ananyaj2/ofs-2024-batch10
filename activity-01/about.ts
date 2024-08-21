/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */

import * as AccUtils from "../accUtils";
import * as ko from 'knockout';
import { whenDocumentReady } from 'ojs/ojbootstrap';
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import 'ojs/ojconverterutils-i18n';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojvalidation-base';
import 'ojs/ojdatetimepicker';
import 'ojs/ojtimezonedata';
import 'ojs/ojknockout';
import 'ojs/ojbutton';
import 'ojs/ojinputtext';
import 'ojs/ojlabelvalue';
import { ojRadioset } from 'ojs/ojradioset';
import 'ojs/ojradioset';
import 'ojs/ojcheckboxset';
import 'ojs/ojselectcombobox';
import 'ojs/ojselectsingle';
import 'ojs/ojformlayout';
import * as Bootstrap from 'ojs/ojbootstrap';
import 'ojs/ojknockout';
import 'oj-c/input-text';
import 'oj-c/checkboxset';
import 'oj-c/form-layout';
import 'oj-c/radioset';
import 'oj-c/input-date-text';
import Message = require("ojs/ojmessaging");
import 'oj-c/input-password';
import 'oj-c/form-layout';
import "oj-c/input-date-text";
import 'ojs/ojradioset';
import 'ojs/ojcheckboxset';
import "oj-c/progress-bar";
import { ojMessage } from 'ojs/ojmessage';
import 'ojs/ojmessages';
import 'ojs/ojknockout';
import 'ojs/ojselectsingle';
import 'ojs/ojdatetimepicker';
import { ojButton } from 'ojs/ojbutton';

class AboutViewModel {



  username: ko.Observable<string>;
  salary: ko.Observable<number> | ko.Observable<any>;
  value: ko.Observable<string>;
  date: ko.Observable<string>;
  private readonly step = ko.observable(0);
  messages: ojMessage.Message[];
  messagesDataprovider: ArrayDataProvider<null, ojMessage.Message>;
  readonly selectVal = ko.observable('CH');

  readonly progressValue = ko.pureComputed(() => {
    return Math.min(this.step(), 10);
  });

  private readonly country = [
    { value: 'MH', label: 'Maharashtra' },
    { value: 'GJ', label: 'Gujarat' },
    { value: 'MP', label: 'Madhya Pradesh' },
  ];

  readonly countriesDP = new ArrayDataProvider(this.country, {
    keyAttributes: 'value'
  });

  
  
  constructor() {
    this.showHelloWorld = function () {
      alert('Hello World!');
    };
    this.username = ko.observable("");
    this.salary = ko.observable(0);
    this.value = ko.observable('2023-04-27');
    this.date = ko.observable('2024-12-15');

    window.setInterval(() => {
      this.step((this.step() + 1) % 200);
    }, 30);

    const isoTimeNow = new Date().toISOString();
      const isoTimeYesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      this.messages = [
        {
          severity: 'error',
          summary: 'Error message summary',
          detail: 'Error message detail',
          timestamp: isoTimeNow
        }
      ];

      this.messagesDataprovider = new ArrayDataProvider([]);
      
      
  }

  public showHelloWorld = () => {
    alert('Hello, World!');
  };
}

export = AboutViewModel;