import { useEffect } from 'react';
import ReviewForm from '../review-form/review-form';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthStatus, getOfferReviews } from '../../store/action';
import {
  ONE_STAR_RATIO,
  MAX_REVIEWS,
  AuthorizationStatus,
  DATE,
  MONTH_TEXT,
} from '../../constants';
import { fetchOfferReviewsAction } from '../../store/api-actions';

type ReviewsProps = {
  offerId: string | undefined;
};

function Reviews({ offerId }: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthStatus);
  const reviewList = useAppSelector(getOfferReviews);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferReviewsAction(offerId));
    }
  }, [offerId, dispatch]);

  const sortedReviews = [...reviewList]
    .sort((a, b) => dayjs(b.date).diff(a.date))
    .slice(0, MAX_REVIEWS);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviewList.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.map(({ id, date, user, comment, rating }) => {
          const reviewDate = dayjs(date).format(DATE);
          const year = dayjs(date).year();
          const month = dayjs(date).format(MONTH_TEXT);

          return (
            <li className="reviews__item" key={id}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={user.avatarUrl}
                    width={54}
                    height={54}
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{user.name}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span
                      style={{
                        width: `${rating * ONE_STAR_RATIO}%`,
                      }}
                    />
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">{comment}</p>
                <time className="reviews__time" dateTime={reviewDate}>
                  {month} {year}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
      {isAuth && <ReviewForm />}
    </section>
  );
}

export { Reviews };
