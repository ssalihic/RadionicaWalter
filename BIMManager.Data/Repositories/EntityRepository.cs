using BIMManager.Data.Abstract;
using BIMManager.Models.Entities;

namespace BIMManager.Data.Repositories
{
    public class EntityRepository : BaseRepository<Entity>, IEntityRepository
    {
        public EntityRepository(BIMManagerContext context) : base(context) { }
    }
}
