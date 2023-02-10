import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  protected http: HttpClient;

  constructor(protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  async send(ask: string) {
    return new Promise<string>((resolve, reject) => {
      const apiKey = 'Bearer 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';
      let body = '{"model": "text-davinci-001", "prompt": "' + ask + '", "temperature": 1, "max_tokens": 100}';

      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('authorization', apiKey);

      this.http.post('https://api.openai.com/v1/completions', body, { headers: headers }).toPromise().then((r: any) => {
        resolve(r.choices[0].text);
      })
    })
  }
}