namespace BIMManager.Models.Entities
{
    public class Entity : IBaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int ComplexId { get; set; }
        public Complex Complex { get; set; }
    }
}
