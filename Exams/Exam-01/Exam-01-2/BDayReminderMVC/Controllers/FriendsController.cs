using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Mvc;

namespace BDayReminderMVC.wwwroot.Controllers
{
    public class FriendsController : Controller
    {
        private static List<Friend> friendsList = LoadFriends();

        // GET: FriendsController
        public ActionResult Home()
        {
            return View(friendsList);
        }

        // GET: FriendsController
        public ActionResult Index()
        {
            return View(friendsList);
        }
        // GET: FriendsController/Details/5
        public ActionResult Details(int id)
        {
            var friend = friendsList.Find(friend => friend.Id == id);
            if (friend != null)
            {
                DateTime currentDate = DateTime.Today;
                DateTime nextBirthday = new DateTime(currentDate.Year, friend.DateOfBirth.Month, friend.DateOfBirth.Day, 0, 0, 0, DateTimeKind.Local);
                if (nextBirthday < currentDate)
                {
                    nextBirthday = nextBirthday.AddYears(1);
                }
                int daysRemaining = (nextBirthday - currentDate).Days;
                int daysRemainingPercent = (daysRemaining * 100) / 365;
                // Agregar los datos de los días faltantes al modelo
                ViewData["DaysRemaining"] = daysRemaining;
                ViewData["daysRemainingPercent"] = daysRemainingPercent;
            }
            // Calcular los días faltantes para el próximo cumpleaños

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
        public ActionResult Create(Friend friends)
        {
            try
            {
                friends.Id = friendsList.Count + 1;
                friendsList.Add(friends);
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: FriendsController/Edit/5
        public ActionResult Edit(int id)
        {
            var Friend = friendsList.Find(friend => friend.Id == id);

            if (Friend != null)
            {
                DateTime currentDate = DateTime.Today;
                DateTime nextBirthday = new DateTime(currentDate.Year, Friend.DateOfBirth.Month, Friend.DateOfBirth.Day, 0, 0, 0, DateTimeKind.Local);
                if (nextBirthday < currentDate)
                {
                    nextBirthday = nextBirthday.AddYears(1);
                }
                int daysRemaining = (nextBirthday - currentDate).Days;
                int daysRemainingPercent = (daysRemaining * 100) / 365;
                // Agregar los datos de los días faltantes al modelo
                ViewData["DaysRemaining"] = daysRemaining;
                ViewData["daysRemainingPercent"] = daysRemainingPercent;
            }
            // Calcular los días faltantes para el próximo cumpleaños

            return View(Friend);
        }

        // POST: FriendsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Friend friend)
        {
            try
            {
                var editFriend = friendsList.Find(friend => friend.Id == id);

                if (editFriend != null)
                {
                    var index = friendsList.IndexOf(editFriend);
                    friendsList[index] = friend;
                }

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
            var Friend = friendsList.Find(Currentfriend => Currentfriend.Id == id);
            return View(Friend);
        }

        // POST: FriendsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                var Remove = friendsList.Find(friend => friend.Id == id);

                if (Remove != null)
                {
                    friendsList.Remove(Remove);
                }

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        public static List<Friend> LoadFriends()
        {
            var friends = new List<Friend>();
            friends.Add(new Friend() { Id = 1, FirstName = "Andrea", LastName = "Leavry", DateOfBirth = new DateOnly(1990, 5, 15), Gender = 'F', Photo = "Andrea_Leavry.png", Relations = new List<string> { "Family", "Work", "School" } });
            friends.Add(new Friend() { Id = 2, FirstName = "Benedick", LastName = "Felten", DateOfBirth = new DateOnly(1997, 12, 3), Gender = 'M', Photo = "Benedick_Felten.png", Relations = new List<string> { "Work", "School", "University" } });
            friends.Add(new Friend() { Id = 3, FirstName = "Benjamin", LastName = "Batteur", DateOfBirth = new DateOnly(1991, 3, 27), Gender = 'M', Photo = "Benjamin_Batteur.png", Relations = new List<string> { "School", "University", "Travel" } });
            friends.Add(new Friend() { Id = 4, FirstName = "Brandon", LastName = "Rostein", DateOfBirth = new DateOnly(1992, 2, 16), Gender = 'M', Photo = "Brandon_Rostein.png", Relations = new List<string> { "University", "Travel", "Family" } });
            friends.Add(new Friend() { Id = 5, FirstName = "Camila", LastName = "Glancey", DateOfBirth = new DateOnly(1995, 5, 20), Gender = 'F', Photo = "Camila_Glancey.png", Relations = new List<string> { "Travel", "Family", "Work" } });
            friends.Add(new Friend() { Id = 6, FirstName = "Christian", LastName = "Pack", DateOfBirth = new DateOnly(1985, 10, 28), Gender = 'M', Photo = "Christian_Pack.png", Relations = new List<string> { "University", "Travel", "Work" } });
            friends.Add(new Friend() { Id = 7, FirstName = "Emmet", LastName = "Gimlet", DateOfBirth = new DateOnly(1987, 1, 21), Gender = 'M', Photo = "Emmet_Gimlet.png", Relations = new List<string> { "Travel", "Family", "School" } });
            friends.Add(new Friend() { Id = 8, FirstName = "Humbert", LastName = "Heikin", DateOfBirth = new DateOnly(1971, 8, 28), Gender = 'M', Photo = "Humbert_Heikin.png", Relations = new List<string> { "Family", "Work", "University" } });
            friends.Add(new Friend() { Id = 9, FirstName = "Jayne", LastName = "Arends", DateOfBirth = new DateOnly(2001, 6, 21), Gender = 'F', Photo = "Jayne_Arends.png", Relations = new List<string> { "Work", "School", "Travel" } });
            friends.Add(new Friend() { Id = 10, FirstName = "Luca", LastName = "Sevior", DateOfBirth = new DateOnly(1985, 11, 23), Gender = 'M', Photo = "Luca_Sevior.png", Relations = new List<string> { "School", "University", "Family" } });
            friends.Add(new Friend() { Id = 11, FirstName = "Marcela", LastName = "Gamon", DateOfBirth = new DateOnly(1999, 4, 5), Gender = 'F', Photo = "Marcela_Gamon.png", Relations = new List<string> { "Family", "Work", "School" } });
            friends.Add(new Friend() { Id = 12, FirstName = "Myrella", LastName = "Alpeth", DateOfBirth = new DateOnly(1998, 9, 20), Gender = 'F', Photo = "Myrella_Alpeth.png", Relations = new List<string> { "Travel", "Family", "School" } });
            friends.Add(new Friend() { Id = 13, FirstName = "Robert", LastName = "Klein", DateOfBirth = new DateOnly(1979, 3, 15), Gender = 'M', Photo = "Robert_Klein.png", Relations = new List<string> { "University", "Work", "Travel" } });
            friends.Add(new Friend() { Id = 14, FirstName = "Rosina", LastName = "Chanatier", DateOfBirth = new DateOnly(1996, 5, 3), Gender = 'F', Photo = "Rosina_Chanatier.png", Relations = new List<string> { "School", "University", "School" } });
            friends.Add(new Friend() { Id = 15, FirstName = "Sebastian", LastName = "Sindall", DateOfBirth = new DateOnly(1995, 2, 20), Gender = 'M', Photo = "Sebastian_Sindall.png", Relations = new List<string> { "Work", "University", "Family" } });
            friends.Add(new Friend() { Id = 16, FirstName = "Silvie", LastName = "Covrino", DateOfBirth = new DateOnly(1990, 4, 11), Gender = 'F', Photo = "Silvie_Covrino.png", Relations = new List<string> { "Family", "Travel", "Work" } });
            friends.Add(new Friend() { Id = 17, FirstName = "Torey", LastName = "Bradfort", DateOfBirth = new DateOnly(1989, 8, 13), Gender = 'F', Photo = "Torey_Bradfort.png", Relations = new List<string> { "School", "University", "Travel" } });
            friends.Add(new Friend() { Id = 18, FirstName = "Trudy", LastName = "Kinnin", DateOfBirth = new DateOnly(1988, 7, 8), Gender = 'F', Photo = "Trudy_Kinnin.png", Relations = new List<string> { "Travel", "Family", "School" } });
            friends.Add(new Friend() { Id = 19, FirstName = "Verina", LastName = "Merlus", DateOfBirth = new DateOnly(2003, 6, 3), Gender = 'F', Photo = "Verina_Merlus.png", Relations = new List<string> { "Family", "Work", "University" } });
            friends.Add(new Friend() { Id = 20, FirstName = "Vita", LastName = "Pizzella", DateOfBirth = new DateOnly(1993, 1, 7), Gender = 'F', Photo = "Vita_Pizzella.png", Relations = new List<string> { "Work", "School", "University" } });
            friends.Add(new Friend() { Id = 21, FirstName = "Sergio", LastName = "ñu", DateOfBirth = new DateOnly(1978, 12, 7), Gender = 'M', Photo = "Sergio_ñu.jpg", Relations = new List<string> { "Work", "School", "University" } });
            friends.Add(new Friend() { Id = 22, FirstName = "Camilo", LastName = "Lopez", DateOfBirth = new DateOnly(1993, 8, 3), Gender = 'M', Photo = "Camilo_Lopez.jpg", Relations = new List<string> { "Work", "School", "University" } });
            friends.Add(new Friend() { Id = 23, FirstName = "Daniela", LastName = "Ever", DateOfBirth = new DateOnly(2002, 2, 11), Gender = 'F', Photo = "Daniela_Ever.jpg", Relations = new List<string> { "Work", "School", "University" } });
            friends.Add(new Friend() { Id = 24, FirstName = "Diana ", LastName = "Luz", DateOfBirth = new DateOnly(1993, 1, 7), Gender = 'F', Photo = "Diana_luz.jpg", Relations = new List<string> { "Work", "School", "University" } });
            friends.Add(new Friend() { Id = 25, FirstName = "Gabriela", LastName = "Velez", DateOfBirth = new DateOnly(1993, 1, 7), Gender = 'F', Photo = "Gabriela_Velez.jpg", Relations = new List<string> { "Work", "School", "University" } });
            friends.Add(new Friend() { Id = 26, FirstName = "Juan sebastian", LastName = "Galindo", DateOfBirth = new DateOnly(1993, 1, 7), Gender = 'M', Photo = "Juan sebastian_Ga.jpg", Relations = new List<string> { "Work", "School", "University" } });
            friends.Add(new Friend() { Id = 28, FirstName = "Laura", LastName = "Ramu", DateOfBirth = new DateOnly(2004, 5, 7), Gender = 'F', Photo = "Laura_Ramu.jpg", Relations = new List<string> { "Work", "School", "University" } });
            friends.Add(new Friend() { Id = 29, FirstName = "Melany", LastName = "Tore", DateOfBirth = new DateOnly(1995, 2, 28), Gender = 'F', Photo = "Melany_Tore.jpg", Relations = new List<string> { "Work", "School", "University" } });
            friends.Add(new Friend() { Id = 30, FirstName = "Sofia", LastName = "Mafla", DateOfBirth = new DateOnly(1993, 1, 7), Gender = 'F', Photo = "Sofia_Mafla.jpg", Relations = new List<string> { "Work", "School", "University" } });
            return friends;
        }
    }
}