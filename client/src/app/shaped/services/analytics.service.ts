import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {OverviewPage, AnalyticsPage} from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analytics/overview')
  }

  getAnalytics(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analytics/analytics')
  }
  getMonth(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analytics/month')
  }
  getQuart(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analytics/quart')
  }
  getHalf(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analytics/half')
  }
  getYear(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analytics/year')
  }
}
