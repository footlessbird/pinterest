import { call, put } from "redux-saga/effects";
import { AsyncActionCreatorBuilder, PayloadAction } from "typesafe-actions";

/* 
  유틸함수의 재사용성을 높이기 위하여 함수의 파라미터는 언제나 하나의 값을 사용하도록 하고,
  action.payload 를 그대로 파라미터로 넣어주도록 설정합니다.
  만약에 여러가지 종류의 값을 파라미터로 넣어야 한다면 객체 형태로 만들어줘야 합니다.
*/
type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

// action 이 payload 를 갖고 있는지 확인합니다.
// __ is __ 문법은 Type guard 라고 부릅니다 https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions
function isPayloadAction<P>(action: any): action is PayloadAction<string, P> {
  return action.payload !== undefined;
}

export default function createAsyncSaga<T1, P1, T2, P2, T3, P3>(
  //   asyncActionCreator: AsyncActionCreatorBuilder<[T1, P1], [T2, P2], [T3, P3]>,
  asyncActionCreator: AsyncActionCreatorBuilder<
    [T1, [P1, undefined]],
    [T2, [P2, undefined]],
    [T3, [P3, undefined]]
  >,
  promiseCreator: PromiseCreatorFunction<P1, P2>
) {
  return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
    try {
      const result = isPayloadAction<P1>(action)
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);
      yield put(asyncActionCreator.success(result));
    } catch (err) {
      yield put(asyncActionCreator.failure(err));
    }
  };
}

/*
type TPromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

export default function createAsyncSaga<
  RequestType,
  RequestPayload,
  SuccessType,
  SuccessPayload,
  FailureType,
  FailurePayload
>(
  asyncAction: AsyncActionCreatorBuilder<
    [RequestType, [RequestPayload, undefined]],
    [SuccessType, [SuccessPayload, undefined]],
    [FailureType, [FailurePayload, undefined]]
  >,
  asyncFunction: TPromiseCreatorFunction<RequestPayload, SuccessPayload>,
  successFunc?: any,
  failureFunc?: any
) {
  return function* saga(action: ReturnType<typeof asyncAction.request>) {
    try {
      const result: SuccessPayload = yield call(
        asyncFunction,
        (action as any).payload
      ); // api 호출 이때 파라미터는 request()에서 받은 값으로 전달
      yield put(asyncAction.success(result)); // success  액션함수를 dispatch 하여 api결과값 반환
      if (successFunc) {
        yield call(successFunc, result); // 성공 이후의 추가 액션이 필요할 경우 이에대한  callback 선언
      }
    } catch (e) {
      yield put(asyncAction.failure(e)); // failure  액션함수를 dispatch 하여 error 반환
      if (failureFunc) {
        yield call(successFunc, e); // 실패 이후의 추가 액션이 필요할 경우 이에대한  callback 선언
      }
    }
  };
}
*/
