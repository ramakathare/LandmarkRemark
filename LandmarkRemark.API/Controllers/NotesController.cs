using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using LandmarkRemark.Entities;
using LandmarkRemark.Entities.Models;
using LandmarkRemark.Service.Services;
using System.Threading;
using LandmarkRemark.Repository.DomainModel;
using Repository.Pattern.UnitOfWork;

namespace LandmarkRemark.API.Controllers
{
    [Authorize]
    public class NotesController : ApiController
    {
        private readonly INotesService notesService;
        private readonly IUnitOfWorkAsync unitofWork;
        public NotesController(INotesService _notesService, IUnitOfWorkAsync _unitofWork)
        {
            this.notesService = _notesService;
            this.unitofWork = _unitofWork;
        }
        

        // GET: api/Notes
        public IQueryable<NotesModel> GetNotes([FromUri] string filter)
        {
            var userEmail = Thread.CurrentPrincipal.Identity.Name;
            return notesService.GetNotes(filter, userEmail);
        }
        // PUT: api/Notes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNote(int id, Note note)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != note.NoteId)
            {
                return BadRequest();
            }

            
            try
            {
                notesService.Update(note);
                unitofWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!notesService.Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Json(new
            {
                success = true,
                message = "NOTES_UPDATED"
            });
        }

        // POST: api/Notes
        [ResponseType(typeof(Note))]
        public IHttpActionResult PostNote(Note note)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            notesService.Insert(note);
            unitofWork.SaveChanges();

            return Json(new
            {
                success = true,
                message = "NOTES_ADDED",
                NoteId = note.NoteId,
                date = note.Date
            });
        }



        //// GET: api/Notes/5
        //[ResponseType(typeof(Note))]
        //public async Task<IHttpActionResult> GetNote(int id)
        //{
        //    Note note = await db.Notes.FindAsync(id);
        //    if (note == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(note);
        //}


        //// DELETE: api/Notes/5
        //[ResponseType(typeof(Note))]
        //public async Task<IHttpActionResult> DeleteNote(int id)
        //{
        //    Note note = await db.Notes.FindAsync(id);
        //    if (note == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Notes.Remove(note);
        //    await db.SaveChangesAsync();

        //    return Ok(note);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                //db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}