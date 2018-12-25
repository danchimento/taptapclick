var wildcardCompare = (item1, item2) => {
    var indexOfItem1Wildcard = item1.indexOf('*');

    if (indexOfItem1Wildcard == 0) {
        return item2.endsWith(item1.replace('*', ''));
    }

    if (indexOfItem1Wildcard == item1.length - 1) {
        return item2.startsWith(item1.replace('*', ''));
    }

    var indexOfItem2Wildcard = item2.indexOf('*');

    if (indexOfItem2Wildcard == 0) {
        return item1.endsWith(item2.replace('*', ''));
    }

    if (indexOfItem2Wildcard == item1.length - 1) {
        return item1.startsWith(item2.replace('*', ''));
    }

    return item1 == item2;
}

export {
    wildcardCompare
}