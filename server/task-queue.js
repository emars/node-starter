class TaskQueue {
  constructor () {
    this._oldestIndex = 1
    this._newestIndex = 1
    this._storage = []
  }

  size () {
    return this._newestIndex - this._oldestIndex
  }

  show () {
    return this._storage
  }

  enqueue (data) {
    this._storage[this._newestIndex] = data
  }

  hasTask () {
    return this._storage[oldestIndex] !== null
  }

  dequeue () {
    if (oldestIndex !== newestIndex) {
      const data = this._storage[oldestIndex]
      delete this._storage[oldestIndex]
      this._oldestIndex++

      return data
    } else {
      return null
    }
  }
}

export default TaskQueue
