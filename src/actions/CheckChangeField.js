export function CheckChangeField(isChanged) {
    return {
        type: "CHECK_CHANGED_FIELD",
        status: isChanged
    }
}