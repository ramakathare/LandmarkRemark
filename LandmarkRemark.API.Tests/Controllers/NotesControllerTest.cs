using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LandmarkRemark.API;
using LandmarkRemark.API.Controllers;
using LandmarkRemark.Entities;
using Repository.Pattern.DataContext;
using Repository.Pattern.UnitOfWork;
using Repository.Pattern.Ef6;
using LandmarkRemark.Entities.Models;
using Repository.Pattern.Repositories;
using Service.Pattern;
using LandmarkRemark.Service.Services;
using LandmarkRemark.Repository.DomainModel;
using System.Web.Http.Routing;
using System.Web.Http.Results;
using Newtonsoft.Json.Linq;
using System.Web.Mvc;

namespace LandmarkRemark.API.Tests.Controllers
{
    [TestClass]
    public class NotesControllerTest
    {
        [TestMethod]
        public void GetNotes()
        {
            // Arrange
            using (IDataContextAsync context = new LandmarkRemarkContext())
            using (IUnitOfWorkAsync unitOfWork = new UnitOfWork(context))
            {
                IRepositoryAsync<Note> repository = new Repository<Note>(context, unitOfWork);
                INotesService notesService = new NotesService(repository);
                NotesController controller = new NotesController(notesService, unitOfWork);

                List<NotesModel> result = controller.GetNotes("").ToList();

                // Assert
                Assert.IsNotNull(result);
                Assert.AreEqual(5, result.Count());
                Assert.AreEqual("Notes", result.ElementAt(0).Notes);
            }
        }


        [TestMethod]
        public void Post()
        {
            using (IDataContextAsync context = new LandmarkRemarkContext())
            using (IUnitOfWorkAsync unitOfWork = new UnitOfWork(context))
            {


                IRepositoryAsync<Note> repository = new Repository<Note>(context, unitOfWork);
                INotesService notesService = new NotesService(repository);
                NotesController controller = new NotesController(notesService, unitOfWork);

                //controller.Request = new HttpRequestMessage
                //{
                //    RequestUri = new Uri("http://localhost/api/Notes")
                //};
                //controller.Configuration = new HttpConfiguration();
                //controller.Configuration.Routes.MapHttpRoute(
                //    name: "DefaultApi",
                //    routeTemplate: "api/{controller}/{id}",
                //    defaults: new { id = RouteParameter.Optional });

                //controller.RequestContext.RouteData = new HttpRouteData(
                //    route: new HttpRoute(),
                //    values: new HttpRouteValueDictionary { { "controller", "notes" } });


                IHttpActionResult response = controller.PostNote(new Note
                {
                    Notes = "Test",
                    Address = "Test Address",
                    Date = DateTime.Now,
                    Lat = 1.253565M,
                    Lng = 125.22252M,
                    User = "ramakathare@gmail.com"
                });

                var data = (response as dynamic).Content;
                Assert.AreEqual(data.success, true);
            }

        }

        [TestMethod]
        public void Put()
        {
            using (IDataContextAsync context = new LandmarkRemarkContext())
            using (IUnitOfWorkAsync unitOfWork = new UnitOfWork(context))
            {


                IRepositoryAsync<Note> repository = new Repository<Note>(context, unitOfWork);
                INotesService notesService = new NotesService(repository);
                NotesController controller = new NotesController(notesService, unitOfWork);

                var response = controller.PutNote(7, new Note
                {
                    Notes = "Notes tested",
                    Address = "300 Eu Tong Sen St, Singapore 059816",
                    Date = DateTime.Now,
                    Lat = 1.279366441843M,
                    Lng = 103.839335128002M,
                    User = "ramakathare@gmail.com",
                    NoteId = 7
                });


                var data = (response as dynamic).Content;
                Assert.AreEqual(data.success, true);
            }
        }
    }
}
