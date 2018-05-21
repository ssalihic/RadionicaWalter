using System.ComponentModel.DataAnnotations;

namespace BIMManager.Models.ViewModels
{
    public class ProjectCreateViewModel
    {
        [Required]
        [MinLength(1)]
        public string Name { get; set; }
        [Required]
        [RegularExpression("[0-9]+")]
        public int Version { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
