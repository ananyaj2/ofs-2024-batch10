/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import * as ko from 'knockout';
import * as Bootstrap from 'ojs/ojbootstrap';
import { RESTDataProvider } from 'ojs/ojrestdataprovider';
import 'ojs/ojknockout';
import 'ojs/ojtable';
class IncidentsViewModel {

  dataprovider : RESTDataProvider<any, any>;
  userId: ko.Observable<string>;
  user: ko.Observable<any>;
  errorMessage: ko.Observable<string>;
  fetchMessage: ko.Observable<string>;

  constructor(){
    this.userId = ko.observable('');
    this.user = ko.observable(null);
    this.errorMessage = ko.observable('');
    this.fetchMessage = ko.observable('')
    this.dataprovider = new RESTDataProvider({
      keyAttributes: 'id',
      url: 'http://localhost:9999/users',
      // fetchByOffset and fetchByKeys delegate to fetchFirst if their capabilities are not defined
      // so at minimum we must specify transforms for fetchFirst
      transforms: {
        fetchFirst: {
          request: async (options) => {
            // Use size and offset to set the expected paging parameters and create a request.
            // In this example, "size" corresponds to the endpoint' "limit"
            // parameter and "offset" corresponds to the endpoint' "offset" parameter for the mock
            // server.
            const url = new URL(options.url);
            
            return new Request(url.href);
          },
          response: async ({ body }) => {
            // The mock server sends back a response body with shape { hasMore, totalSize, data } so
            // we need to extract and return them
            const data = body;
            console.log({ data });
            return { data };
          }
        }
      }
    });
    console.log(this.dataprovider);
  }
  async fetchUser() {
    const id = this.userId();
    if (!id) {
      this.fetchMessage('Please enter a user ID.'); // Set fetchMessage for missing ID
      return;
    }

    try {
      const response = await fetch(`http://localhost:9999/users/${id}`);
      if (response.ok) {
        const userData = await response.json();
        this.user(userData);
        this.fetchMessage('User fetched successfully.'); // Set success message
        this.errorMessage(''); // Clear errorMessage if any
      } else if (response.status === 404) {
        this.fetchMessage(''); // Clear fetchMessage
        this.errorMessage(`User with ID ${id} not found.`);
        this.user(null);
      } else {
        this.fetchMessage(''); // Clear fetchMessage
        this.errorMessage('An error occurred while fetching the user.');
        this.user(null);
      }
    } catch (error) {
      this.fetchMessage(''); // Clear fetchMessage
      this.errorMessage('Failed to fetch user data.');
      console.error(error);
    }
  }

  async deleteUser() {
    const id = this.userId();
    if (!id) {
      this.fetchMessage(''); // Clear fetchMessage
      this.errorMessage('Please enter a user ID.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:9999/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        this.fetchMessage(`User with ID ${id} deleted.`); // Set delete success message
        this.errorMessage(''); // Clear errorMessage
        this.user(null);
      } else if (response.status === 404) {
        this.fetchMessage(''); // Clear fetchMessage
        this.errorMessage(`User with ID ${id} not found.`);
      } else {
        this.fetchMessage(''); // Clear fetchMessage
        this.errorMessage('An error occurred while deleting the user.');
      }
    } catch (error) {
      this.fetchMessage(''); // Clear fetchMessage
      this.errorMessage('Failed to delete user.');
      console.error(error);
    }
  }
}

export = IncidentsViewModel;
