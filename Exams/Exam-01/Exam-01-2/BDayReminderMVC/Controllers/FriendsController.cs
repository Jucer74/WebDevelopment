using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Http;
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
                var idNew = friendsList.Count + 1;
                friend.Id = idNew;

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
        public ActionResult Edit(Friend friend)
        {
            try
            {
                var friendEdit = friendsList.FirstOrDefault(x => x.Id == friend.Id);

                friendEdit.Sex = friend.Sex;
                friendEdit.Relations = friend.Relations;
                friendEdit.LastName = friend.LastName;
                friendEdit.FirstName = friend.FirstName;
                friendEdit.DateOfBirth = friend.DateOfBirth;
                friendEdit.Photo = friend.Photo;

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
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {

                var friendDelete = friendsList.FirstOrDefault(x => x.Id == id);
                friendsList.Remove(friendDelete);

                for (int i = 0; i < friendsList.Count; i++)
                {
                    friendsList[i].Id = i + 1;
                }

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

            friends.Add(new Friend() { Id = 1, FirstName = "Andrea", LastName = "Leavry", DateOfBirth = new DateTime(1994,7,19), Photo = "Andrea_Leavry.png", Relations = "Family|Work|School", Sex = "F" });
            friends.Add(new Friend() { Id = 2, FirstName = "Benedick", LastName = "Felten", DateOfBirth = new DateTime(1997, 12, 3), Photo = "Benedick_Felten.png", Relations = "Work|School|University", Sex = "M" });
            friends.Add(new Friend() { Id = 3, FirstName = "Benjamin", LastName = "Batteur", DateOfBirth = new DateTime(1991, 3, 27), Photo = "Benjamin_Batteur.png", Relations = "School|University|Travel", Sex = "M" });
            friends.Add(new Friend() { Id = 4, FirstName = "Brandon", LastName = "Rostein", DateOfBirth = new DateTime(1992, 2, 16), Photo = "Brandon_Rostein.png", Relations = "University|Travel|Family", Sex = "M" });
            friends.Add(new Friend() { Id = 5, FirstName = "Camila", LastName = "Glancey", DateOfBirth = new DateTime(1995, 5, 20), Photo = "Camila_Glancey.png", Relations = "Travel|Family|Work", Sex = "F" });
            friends.Add(new Friend() { Id = 6, FirstName = "Christian", LastName = "Pack", DateOfBirth = new DateTime(1985, 10, 28), Photo = "Christian_Pack.png", Relations = "University|Travel|Work", Sex = "M" });
            friends.Add(new Friend() { Id = 7, FirstName = "Emmet", LastName = "Gimlet", DateOfBirth = new DateTime(1987, 1, 21), Photo = "Emmet_Gimlet.png", Relations = "Travel|Family|School", Sex = "M" });
            friends.Add(new Friend() { Id = 8, FirstName = "Humbert", LastName = "Heikin", DateOfBirth = new DateTime(1971, 8, 28), Photo = "Humbert_Heikin.png", Relations = "Family|Work|University", Sex = "M" });
            friends.Add(new Friend() { Id = 9, FirstName = "Jayne", LastName = "Arends", DateOfBirth = new DateTime(1921, 6, 1), Photo = "Jayne_Arends.png", Relations = "Work|School|Travel", Sex = "F" });
            friends.Add(new Friend() { Id = 10, FirstName = "Luca", LastName = "Sevior", DateOfBirth = new DateTime(1985, 11, 23), Photo = "Luca_Sevior.png", Relations = "School|University|Family", Sex = "M" });
            friends.Add(new Friend() { Id = 11, FirstName = "Marcela", LastName = "Gamon", DateOfBirth = new DateTime(1999, 4, 5), Photo = "Marcela_Gamon.png", Relations = "Family|Work|School", Sex = "F" });
            friends.Add(new Friend() { Id = 12, FirstName = "Myrella", LastName = "Alpeth", DateOfBirth = new DateTime(1998, 9, 20), Photo = "Myrella_Alpeth.png", Relations = "Travel|Family|School", Sex = "F" });
            friends.Add(new Friend() { Id = 13, FirstName = "Robert", LastName = "Klein", DateOfBirth = new DateTime(1979, 3, 15), Photo = "Robert_Klein.png", Relations = "University|Work|Travel", Sex = "M" });
            friends.Add(new Friend() { Id = 14, FirstName = "Rosina", LastName = "Chanatier", DateOfBirth = new DateTime(1996, 5, 3), Photo = "Rosina_Chanatier.png", Relations = "School|School|University", Sex = "F" });
            friends.Add(new Friend() { Id = 15, FirstName = "Sebastian", LastName = "Sindall", DateOfBirth = new DateTime(1995, 2, 20), Photo = "Sebastian_Sindall.png", Relations = "Work|University|Family", Sex = "M" });
            friends.Add(new Friend() { Id = 16, FirstName = "Silvie", LastName = "Covrino", DateOfBirth = new DateTime(1990, 4, 11), Photo = "Silvie_Covrino.png", Relations = "Family|Travel|Work", Sex = "F" });
            friends.Add(new Friend() { Id = 17, FirstName = "Torey", LastName = "Bradfort", DateOfBirth = new DateTime(1989, 8, 13), Photo = "Torey_Bradfort.png", Relations = "School|University|Travel", Sex = "F" });
            friends.Add(new Friend() { Id = 18, FirstName = "Trudy", LastName = "Kinnin", DateOfBirth = new DateTime(1988, 5, 8), Photo = "Trudy_Kinnin.png", Relations = "Travel|Family|School", Sex = "F" });
            friends.Add(new Friend() { Id = 19, FirstName = "Verina", LastName = "Merlus", DateOfBirth = new DateTime(1973, 7, 3), Photo = "Verina_Merlus.png", Relations = "Family|Work|University", Sex = "F" });
            friends.Add(new Friend() { Id = 20, FirstName = "Vita", LastName = "Pizzella", DateOfBirth = new DateTime(1993, 2, 7), Photo = "Vita_Pizzella.png", Relations = "Work|School|University", Sex = "F" });

            return friends;
        }

    }
}
