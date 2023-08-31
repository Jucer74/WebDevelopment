using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Mvc;

namespace BDayReminderMVC.Controllers
{
    public class FriendsController : Controller
    {
        private static List<Friend> friendsList = LoadFriends();

        // GET: FriendsController
        public ActionResult Index()
        {
            return View(friendsList);
        }

        // GET: FriendsController/Details/5
        public ActionResult Details(int id)
        {
            var friend = friendsList.FirstOrDefault(x => x.Id == id);
            return View(friend);
        }

        // GET: FriendsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: FriendsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Friend friend)
        {
            try
            {
                // Cambiar el tipo de Sex a string
                friend.Id = friendsList.Count + 1;
                friend.Sex = Request.Form["Sex"];
                friendsList.Add(friend);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: FriendsController/Edit/5
        public ActionResult Edit(int id)
        {
            var friend = friendsList.FirstOrDefault(x => x.Id == id);
            return View(friend);
        }

        // POST: FriendsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Friend friend)
        {
            try
            {
                // Cambiar el tipo de Sex a string
                friend.Sex = Request.Form["Sex"];
                var elementIndex = friendsList.FindIndex(i => i.Id == id);
                friendsList[elementIndex] = friend;
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: FriendsController/Delete/5
        public ActionResult Delete(int id)
        {
            var friend = friendsList.FirstOrDefault(x => x.Id == id);
            return View(friend);
        }

        // POST: FriendsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, Friend friend)
        {
            try
            {
                var friendDelete = friendsList.FirstOrDefault(x => x.Id == friend.Id);
                friendsList.Remove(friendDelete);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        private static List<Friend> LoadFriends()
        {
            var friends = new List<Friend>();

            friends.Add(new Friend() { Id = 1, FirstName = "Miguel", LastName = "Cordoba", DateOfBirth = new DateTime(2000, 10, 8), Sex = "Male", Relations = "Relative", Photo = "/images/miguel.jpg" });
            friends.Add(new Friend() { Id = 2, FirstName = "Carlos", LastName = "Torres", DateOfBirth = new DateTime(2000, 9, 10), Sex = "Male", Relations = "Relative", Photo = "/images/cata.jpg" });
            friends.Add(new Friend() { Id = 3, FirstName = "Mario", LastName = "Perez", DateOfBirth = new DateTime(2000, 5, 8), Sex = "Male", Relations = "Relative", Photo = "/images/carlos.jpg" });
            friends.Add(new Friend() { Id = 4, FirstName = "Annie", LastName = "Cruz", DateOfBirth = new DateTime(2003, 2, 6), Sex = "Female", Relations = "Relative, friend", Photo = "/images/annie.jpg" });
            friends.Add(new Friend() { Id = 5, FirstName = "Bianca", LastName = "Venavidez", DateOfBirth = new DateTime(2002, 6, 1), Sex = "Female", Relations = "Relative, friend", Photo = "/images/bianca.jpg" });
            friends.Add(new Friend() { Id = 6, FirstName = "Santiago", LastName = "Moreno", DateOfBirth = new DateTime(2001, 5, 2), Sex = "Male", Relations = "Relative, lover", Photo = "/images/santi.jpg" });
            friends.Add(new Friend() { Id = 7, FirstName = "Omar", LastName = "Bravo", DateOfBirth = new DateTime(2004, 5, 9), Sex = "Male", Relations = "Relative, associate", Photo = "/images/omar.jpg" });
            friends.Add(new Friend() { Id = 8, FirstName = "Felipe", LastName = "Araujo", DateOfBirth = new DateTime(2003, 7, 2), Sex = "Male", Relations = "Friend", Photo = "/images/felipe.jpg" });
            friends.Add(new Friend() { Id = 7, FirstName = "Juan", LastName = "Zúñiga", DateOfBirth = new DateTime(2001, 3, 6), Sex = "Male", Relations = "Friend", Photo = "/images/zuni.jpg" });
            return friends;
        }
    }
}