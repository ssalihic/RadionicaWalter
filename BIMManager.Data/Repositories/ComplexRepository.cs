using BIMManager.Data.Abstract;
using BIMManager.Models.Entities;

namespace BIMManager.Data.Repositories
{
    public class ComplexRepository : BaseRepository<Complex>, IComplexRepository
    {
        public ComplexRepository(BIMManagerContext context) : base(context) { }
    }
}
