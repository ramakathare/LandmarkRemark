using LandmarkRemark.Entities.Models;
using LandmarkRemark.Repository.DomainModel;
using LandmarkRemark.Repository.Repositories;
using Repository.Pattern.Repositories;
using Service.Pattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LandmarkRemark.Service.Services
{
    /// <summary>
    ///     Add any custom business logic (methods) here
    /// </summary>
    public interface INotesService : IService<Note>
    {
         IQueryable<NotesModel> GetNotes(string filter, string userEmail);
        bool Exists(int id);
    }

    /// <summary>
    ///     All methods that are exposed from Repository in Service are overridable to add business logic,
    ///     business logic should be in the Service layer and not in repository for separation of concerns.
    /// </summary>
    public class NotesService : Service<Note>, INotesService
    {
        private readonly IRepositoryAsync<Note> _repository;

        public NotesService(IRepositoryAsync<Note> repository ) : base(repository)
        {
            _repository = repository;
        }
        public IQueryable<NotesModel> GetNotes(string filter, string userEmail)
        {
            return _repository.GetNotes(filter, userEmail);
        }
        public bool Exists(int id)
        {
            return _repository.Queryable().Any(p => p.NoteId ==id);
        }
    }
}
