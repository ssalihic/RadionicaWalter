using BIMManager.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace BIMManager.Models.Entities
{
    public class Project : IBaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Version { get; set; }
        public string Status { get; set; }
        public ICollection<BIMModel> BIMModels { get; set; }

        public Project() { }

        public Project(ProjectCreateViewModel projectCreateViewModel) {
            Name = projectCreateViewModel.Name;
            Version = projectCreateViewModel.Version;
            Status = projectCreateViewModel.Status;
        }
    }
}
