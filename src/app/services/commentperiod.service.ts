import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';

import { ApiService } from './api';
import { CommentPeriod } from 'app/models/commentPeriod';
import { CommentPeriodSummary } from 'app/models/commentPeriodSummary';

@Injectable()
export class CommentPeriodService {

  // statuses (also used as short strings)
  readonly NOT_STARTED = 'Not Started';
  readonly NOT_OPEN = 'Not Open';
  readonly CLOSED = 'Closed';
  readonly OPEN = 'Open';

  // use helpers to get these:
  private commentStatuses = [];

  constructor(private api: ApiService) {
    // user-friendly strings
    this.commentStatuses[this.NOT_STARTED] = 'Commenting Not Started';
    this.commentStatuses[this.NOT_OPEN] = 'Not Open For Commenting';
    this.commentStatuses[this.CLOSED] = 'Commenting Closed';
    this.commentStatuses[this.OPEN] = 'Commenting Open';
  }

  // get all comment periods for the specified project id
  getAllByProjectId(projId: string, pageNum: number = 1, pageSize: number = 10, sortBy: string = null): Observable<Object> {
    return this.api.getPeriodsByProjId(projId, pageNum, pageSize, sortBy)
      .map((res: any) => {
        if (res) {
          const periods: Array<CommentPeriod> = [];
          if (!res || res.length === 0) {
            return { totalCount: 0, data: [] };
          }
          res[0].results.forEach(cp => {
            periods.push(new CommentPeriod(cp));
          });
          return { totalCount: res[0].total_items, data: periods };
        }
        return {};
      })
      .catch(error => this.api.handleError(error));
  }

  // get a specific comment period by its id
  getById(periodId: string): Observable<CommentPeriod> {
    return this.api.getPeriod(periodId)
      .map(res => {
        if (res && res.length > 0) {
          // return the first (only) comment period
          return new CommentPeriod(res[0]);
        }
        return null;
      })
      .catch(error => this.api.handleError(error));
  }

  getSummaryById(periodId: string): Observable<CommentPeriodSummary> {
    return this.api.getPeriodSummary(periodId)
      .map(res => {
        if (res) {
          return new CommentPeriodSummary(res);
        }
        return null;
      })
      .catch(error => this.api.handleError(error));
  }

  add(commentPeriod: CommentPeriod): Observable<CommentPeriod> {
    return this.api.addCommentPeriod(commentPeriod)
      .catch(error => this.api.handleError(error));
  }

  save(orig: CommentPeriod): Observable<CommentPeriod> {
    // make a (deep) copy of the passed-in comment period so we don't change it
    const period = _.cloneDeep(orig);

    return this.api.saveCommentPeriod(period)
      .catch(error => this.api.handleError(error));
  }

  delete(period: CommentPeriod): Observable<CommentPeriod> {
    return this.api.deleteCommentPeriod(period)
      .catch(error => this.api.handleError(error));
  }

  publish(period: CommentPeriod): Observable<CommentPeriod> {
    return this.api.publishCommentPeriod(period)
      .catch(error => this.api.handleError(error));
  }

  unPublish(period: CommentPeriod): Observable<CommentPeriod> {
    return this.api.unPublishCommentPeriod(period)
      .catch(error => this.api.handleError(error));
  }

  // returns first period
  // multiple comment periods are currently not supported
  getCurrent(periods: CommentPeriod[]): CommentPeriod {
    return (periods.length > 0) ? periods[0] : null;
  }

  getStatus(period: CommentPeriod): string {
    if (!period || !period.dateStarted || !period.dateCompleted) {
      return this.commentStatuses[this.NOT_OPEN];
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startDate = new Date(period.dateStarted);
    const endDate = new Date(period.dateCompleted);

    if (endDate < today) {
      return this.commentStatuses[this.CLOSED];
    } else if (startDate > today) {
      return this.commentStatuses[this.NOT_STARTED];
    } else {
      return this.commentStatuses[this.OPEN];
    }
  }

  isNotOpen(period: CommentPeriod): boolean {
    return (this.getStatus(period) === this.commentStatuses[this.NOT_OPEN]);
  }

  isClosed(period: CommentPeriod): boolean {
    return (this.getStatus(period) === this.commentStatuses[this.CLOSED]);
  }

  isNotStarted(period: CommentPeriod): boolean {
    return (this.getStatus(period) === this.commentStatuses[this.NOT_STARTED]);
  }

  isOpen(period: CommentPeriod): boolean {
    return (this.getStatus(period) === this.commentStatuses[this.OPEN]);
  }

}
