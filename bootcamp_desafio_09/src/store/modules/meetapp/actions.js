export function createMeetappRequest(data) {
  return {
    type: "@meetapp/CREATE_MEETAPP_REQUEST",
    payload: { data }
  };
}

export function createMeetappSuccess(meetapp) {
  return {
    type: "@meetapp/CREATE_MEETAPP_SUCCESS",
    payload: { meetapp }
  };
}

export function createMeetappFailure() {
  return {
    type: "@meetapp/CREATE_MEETAPP_FAILURE"
  };
}

export function deleteMeetappRequest(id) {
  return {
    type: "@meetapp/DELETE_MEETAPP_REQUEST",
    payload: { id }
  };
}

export function deleteMeetappSuccess() {
  return {
    type: "@meetapp/DELETE_MEETAPP_SUCCESS"
  };
}

export function deleteMeetappFailure() {
  return {
    type: "@meetapp/DELETE_MEETAPP_FAILURE"
  };
}

export function editMeetappRequest(data) {
  return {
    type: "@meetapp/EDIT_MEETAPP_REQUEST",
    payload: { data }
  };
}

export function editMeetappSuccess() {
  return {
    type: "@meetapp/EDIT_MEETAPP_SUCCESS"
  };
}

export function editMeetappFailure() {
  return {
    type: "@meetapp/EDIT_MEETAPP_FAILURE"
  };
}
