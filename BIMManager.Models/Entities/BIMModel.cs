namespace BIMManager.Models.Entities
{
    public class BIMModel : IBaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int ProjectId { get; set; }
        public int ComplexId { get; set; }
        public int EntityId { get; set; }
        public Project Project { get; set; }
        public Complex Complex { get; set; }
        public Entity Entity { get; set; }
    }
}
