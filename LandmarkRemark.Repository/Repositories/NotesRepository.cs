using LandmarkRemark.Entities.Models;
using LandmarkRemark.Repository.DomainModel;
using Repository.Pattern.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LandmarkRemark.Repository.Repositories
{
    public static class NotesRepository
    {
        public static IQueryable<NotesModel> GetNotes(this IRepository<Note> repository, string filter, string userEmail)
        {
            var result = repository.Queryable();
            if (!string.IsNullOrWhiteSpace(filter))
                result = result.Where(p => p.User.Contains(filter) || p.Notes.Contains(filter) || p.Address.Contains(filter));
            return result
                .Select(p => new NotesModel()
                {
                    NoteId = p.NoteId,
                    Notes = p.Notes,
                    Address = p.Address,
                    Date = p.Date,
                    User = p.User,
                    Lat = p.Lat,
                    Lng = p.Lng,
                    IsHome = false,
                    IsOwner = p.User == userEmail,
                    Draggable = p.User == userEmail ? true:false,
                });
        }

    }
}
