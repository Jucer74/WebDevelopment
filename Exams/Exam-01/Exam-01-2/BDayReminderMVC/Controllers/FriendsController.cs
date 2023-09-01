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
            friends.Add(new Friend() { Id = 9, FirstName = "Juan", LastName = "Zúñiga", DateOfBirth = new DateTime(2001, 3, 6), Sex = "Male", Relations = "Friend", Photo = "/images/zuni.jpg" });
            friends.Add(new Friend() { Id = 10, FirstName = "Andrea", LastName = "Perlaza", DateOfBirth = new DateTime(1998, 5, 8), Sex = "Female", Relations = "School", Photo = "/images/Andrea.png" });
            friends.Add(new Friend() { Id = 11, FirstName = "Benedick", LastName = "Ramirez", DateOfBirth = new DateTime(2001, 6, 3), Sex = "Male", Relations = "School, Gym", Photo = "/images/Benedick.png" });
            friends.Add(new Friend() { Id = 12, FirstName = "Benjamin", LastName = "Ocoro", DateOfBirth = new DateTime(1996, 8, 10), Sex = "Male", Relations = "Gym", Photo = "/images/Benjamin.png" });
            friends.Add(new Friend() { Id = 13, FirstName = "Brandon", LastName = "Bolivar", DateOfBirth = new DateTime(1992, 1, 5), Sex = "Male", Relations = "School", Photo = "/images/Brandon.png" });
            friends.Add(new Friend() { Id = 14, FirstName = "Camila", LastName = "Gomez", DateOfBirth = new DateTime(2000, 11, 5), Sex = "Female", Relations = "Party", Photo = "/images/Camila.png" });
            friends.Add(new Friend() { Id = 15, FirstName = "Christian", LastName = "Lopez", DateOfBirth = new DateTime(1995, 12, 12), Sex = "Male", Relations = "Gym", Photo = "/images/Christian.png" });
            friends.Add(new Friend() { Id = 16, FirstName = "Emmet", LastName = "Sanchez", DateOfBirth = new DateTime(1994, 1, 3), Sex = "Male", Relations = "Friend", Photo = "/images/Emmet.png" });
            friends.Add(new Friend() { Id = 17, FirstName = "Humbert", LastName = "Torres", DateOfBirth = new DateTime(1960, 8, 9), Sex = "Male", Relations = "Family", Photo = "/images/Humbert.png" });
            friends.Add(new Friend() { Id = 18, FirstName = "Jayne", LastName = "Jimenez", DateOfBirth = new DateTime(2001, 6, 3), Sex = "Female", Relations = "School, Gym", Photo = "/images/Jayne.png" });
            friends.Add(new Friend() { Id = 19, FirstName = "Luca", LastName = "Paqueta", DateOfBirth = new DateTime(1889, 1, 9), Sex = "Male", Relations = "School", Photo = "/images/Luca.png" });
            friends.Add(new Friend() { Id = 20, FirstName = "Marcela", LastName = "Venus", DateOfBirth = new DateTime(1995, 2, 5), Sex = "Female", Relations = "Party", Photo = "/images/Marcela.png" });
            friends.Add(new Friend() { Id = 21, FirstName = "Myrella", LastName = "Escobar", DateOfBirth = new DateTime(1997, 8, 8), Sex = "Female", Relations = "Family", Photo = "/images/Myrella.png" });
            friends.Add(new Friend() { Id = 22, FirstName = "Robert", LastName = "Dosman", DateOfBirth = new DateTime(1991, 9, 7), Sex = "Male", Relations = "Friend", Photo = "/images/Robert.png" });
            friends.Add(new Friend() { Id = 23, FirstName = "Rosina", LastName = "Mena", DateOfBirth = new DateTime(1998, 5, 9), Sex = "Female", Relations = "Gym", Photo = "/images/Rosina.png" });
            friends.Add(new Friend() { Id = 24, FirstName = "Sebastian", LastName = "Dominguez", DateOfBirth = new DateTime(1993, 5, 5), Sex = "Male", Relations = "Party", Photo = "/images/Sebastian.png" });
            friends.Add(new Friend() { Id = 25, FirstName = "Silvie", LastName = "Valencia", DateOfBirth = new DateTime(2000, 6, 6), Sex = "Female", Relations = "School", Photo = "/images/Silvie.png" });
            friends.Add(new Friend() { Id = 26, FirstName = "Torrey", LastName = "Nunez", DateOfBirth = new DateTime(1996, 7, 7), Sex = "Female", Relations = "Party", Photo = "/images/Torey.png" });
            friends.Add(new Friend() { Id = 27, FirstName = "Trudy", LastName = "Silva", DateOfBirth = new DateTime(1994, 9, 3), Sex = "Female", Relations = "School, Gym", Photo = "/images/Trudy.png" });
            friends.Add(new Friend() { Id = 28, FirstName = "Verina", LastName = "Montoya", DateOfBirth = new DateTime(2002, 1, 1), Sex = "Female", Relations = "University", Photo = "/images/Verina.png" });
            friends.Add(new Friend() { Id = 29, FirstName = "Kobe", LastName = "Bryant", DateOfBirth = new DateTime(1990, 6, 3), Sex = "Male", Relations = "Basket", Photo = "/images/Kobe.jpeg" });
            friends.Add(new Friend() { Id = 30, FirstName = "Bad", LastName = "Bunny", DateOfBirth = new DateTime(1998, 6, 3), Sex = "Male", Relations = "Party", Photo = "/images/Bad.jpeg" });



            return friends;
        }
    }
}