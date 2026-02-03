const database = require('../database/database')

exports.deleteTasks =  async (request, response) => {
    const itemId = request.params.itemId;
    // console.log(userId)
    try {
      const result = await database.pool.query('DELETE FROM tasks WHERE _id = $1;' , [userId]);
      return response.status(200).json({message: `Get tasks Error: ${error}`})
    } catch (error) {
      return response.status(500).json({message: `Get tasks Error: ${error}`})
    }
  }