using BIMManager.Data.Abstract;
using BIMManager.Models.Entities;

namespace BIMManager.Data.Repositories
{
    public class ProjectRepository : BaseRepository<Project>, IProjectRepository
    {
        public ProjectRepository(BIMManagerContext context) : base(context) { }
    }
}
