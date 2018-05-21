using BIMManager.Data.Abstract;
using BIMManager.Models.Entities;

namespace BIMManager.Data.Repositories
{
    public class BIMModelRepository : BaseRepository<BIMModel>, IBimModelRepository
    {
        public BIMModelRepository(BIMManagerContext context) : base(context) { }
    }
}
