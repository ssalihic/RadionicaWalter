
using BIMManager.Models.Entities;

namespace BIMManager.Data.Abstract
{

    public interface IProjectRepository : IBaseRepository<Project> { }
    public interface IBimModelRepository : IBaseRepository<BIMModel> { }
    public interface IComplexRepository : IBaseRepository<Complex> { }
    public interface IEntityRepository : IBaseRepository<Entity> { }
}
