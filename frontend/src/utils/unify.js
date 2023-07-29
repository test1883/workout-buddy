const count = (arr, el) => {
    let n = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === el) n++
    }
    return n
}

const unify = (users) => {
    const userNames = []
    users.map(user => {
        const userName = user.userName
        if (count(userNames, userName) === 0) userNames.push(userName)
    })
    return userNames
}
export default unify