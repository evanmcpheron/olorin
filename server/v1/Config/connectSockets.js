export default (app, server, io) => {
  let activeUsers = []
  io.on('connection', (socket) => {
    // add new User
    socket.on('new-user-add', (newUser) => {
      // if user is not added previously
      socket.join(newUser.room)
      if (!activeUsers.some((user) => user.id === newUser.id) && newUser.name) {
        activeUsers.push({
          ...newUser,
          votes: [
            { category: 'Uncertainty', value: 'N/A', id: newUser.id },
            { category: 'Complexity', value: 'N/A', id: newUser.id },
            { category: 'Effort', value: 'N/A', id: newUser.id },
          ],
          socketId: socket.id,
        })
      }
      // // send all active users to new user
      io.to(newUser.room).emit('get-users', activeUsers)
    })

    socket.on('disconnect', () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
      io.emit('get-users', activeUsers)
    })

    socket.on('offline', () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
      // send all active users to all users
      io.emit('get-users', activeUsers)
    })

    // typing status
    socket.on('new-vote', (data, room) => {
      const userIndex = activeUsers.findIndex((user) => user.id === data.id)
      activeUsers[userIndex] = { ...data, socketId: socket.id }
      io.to(room).emit('new-vote', activeUsers)
    })

    socket.on('change-point-visibility', (data, room) => {
      io.to(room).emit('change-point-visibility', data)
    })

    socket.on('reset-scores', (room) => {
      activeUsers = resetAllVotes(activeUsers)
      io.to(room).emit('reset-scores', activeUsers)
    })
  })
}

const resetAllVotes = (activeUsers) => {
  for (let i = 0; i < activeUsers.length; i++) {
    activeUsers[i].votes = [
      { category: 'Uncertainty', value: 'N/A', id: activeUsers[i].id },
      { category: 'Complexity', value: 'N/A', id: activeUsers[i].id },
      { category: 'Effort', value: 'N/A', id: activeUsers[i].id },
    ]
  }

  return activeUsers
}
