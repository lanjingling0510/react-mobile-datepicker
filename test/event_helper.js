function eventTrigger(element, type, data) {
    const event = new window.Event(type);


    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            event[key] = data[key];
        }
    }

    element.dispatchEvent(event);
}

export default eventTrigger;
