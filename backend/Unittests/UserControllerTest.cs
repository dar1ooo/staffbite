using business_logic.Controllers;
using business_logic.Interfaces;
using business_logic.Models;
using business_logic.TestClasses;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Unittests
{
    public class UserControllerTest
    {
        private readonly UserController _controller;
        private readonly IUserService _service;
        public UserControllerTest()
        {
            _service = new UserServiceFake();
            _controller = new UserController(_service);
        }

        [Fact]
        public void GetTeachers_WhenCalled_ReturnsOkResult()
        {
            // Act
            var okResult = _controller.GetAllTeachers();
            // Assert
            Assert.IsType<OkObjectResult>(okResult as OkObjectResult);
        }
        [Fact]
        public void GetTeachers_WhenCalled_ReturnsAllItems()
        {
            // Act
            var okResult = _controller.GetAllTeachers() as OkObjectResult;
            // Assert
            var items = Assert.IsType<List<User>>(okResult.Value);
            Assert.Equal(3, items.Count);
        }

        [Fact]
        public void GetUser_UnknownUserPassed_ReturnsNotFoundResult()
        {
            // Act
           var notFoundResult = _controller.Login(new UserLogin());
            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult);
        }
        [Fact]
        public void GetByUser_ExistingUserPassed_ReturnsOkResult()
        {
            // Arrange
            var testUser = new UserLogin() { Username = "pmeier1", Password = "pw" };
            // Act
            var okResult = _controller.Login(testUser);
            // Assert
            Assert.IsType<OkObjectResult>(okResult as OkObjectResult);
        }
        [Fact]
        public void GetByUser_ExistingUserPassed_ReturnsRightItem()
        {
            // Arrange
            var testUser = new UserLogin() { Username = "pmeier2", Password = "pw" };
            // Act
            var okResult = _controller.Login(testUser) as OkObjectResult;
            // Assert
            Assert.IsType<User>(okResult.Value);
            Assert.Equal(testUser.Username, (okResult.Value as User).Username);
        }

        [Fact]
        public void Add_InvalidUserPassed_ReturnsBadRequest()
        {
            // Arrange
            var nameMissingItem = new UserRegister()
            {
                Username = "pmeier4",
                Password = "pw",
                IsAdmin = false

            };
            _controller.ModelState.AddModelError("Name", "Required");
            // Act
            var badResponse = _controller.Create(nameMissingItem);
            // Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }
        [Fact]
        public void Add_ValidObjectPassed_ReturnsCreatedResponse()
        {
            // Arrange
            var testItem = new UserRegister()
            {
                Username = "pmeier4",
                Password = "pw",
                Email = "pmeier4@gibz.ch",
                IsAdmin = false

            };
            // Act
            var createdResponse = _controller.Create(testItem);
            // Assert
            Assert.IsType<CreatedAtActionResult>(createdResponse);
        }
        [Fact]
        public void Add_ValidObjectPassed_ReturnedResponseHasCreatedItem()
        {
            // Arrange
            var testItem = new UserRegister()
            {
                Username = "pmeier4",
                Password = "pw",
                Email = "pmeier4@gibz.ch",
                IsAdmin = false

            };
            // Act
            var createdResponse = _controller.Create(testItem) as CreatedAtActionResult;
            var item = createdResponse.Value as User;
            // Assert
            Assert.Null(item);
        }
        [Fact]
        public void Remove_NotExistingUserPassed_ReturnsNotFoundResponse()
        {
            // Arrange
            var notExistingUser = new User();
            // Act
            var badResponse = _controller.Delete(notExistingUser);
            // Assert
            Assert.IsType<NotFoundResult>(badResponse);
        }
        [Fact]
        public void Remove_ExistingUserPassed_ReturnsNoContentResult()
        {
            // Arrange
            var existingUser = new User() { Id = "id1", Email = "petermeier1@gibz.ch", Username = "pmeier1", UserRole = UserRole.Teacher };
            // Act
            var okResponse = _controller.Delete(existingUser);
            // Assert
            Assert.IsType<OkResult>(okResponse);
        }
        [Fact]
        public void Remove_ExistingUserPassed_RemovesOneItem()
        {
            // Arrange
            var existingUser = new User() { Id = "id1", Email = "petermeier1@gibz.ch", Username = "pmeier1", UserRole = UserRole.Teacher };
            // Act
            var okResponse = _controller.Delete(existingUser);
            // Assert
            Assert.Equal(2, _service.GetAllTeachers().Count());
        }
        [Fact]
        public void Get_WhenCalled_ReturnsOkResult()
        {
            // Act
            var okResult = _controller.GetTakenUsernames();
            // Assert
            Assert.IsType<OkObjectResult>(okResult as OkObjectResult);
        }
        [Fact]
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Act
            var okResult = _controller.GetTakenUsernames() as OkObjectResult;
            // Assert
            var items = Assert.IsType<List<string>>(okResult.Value);
            Assert.Equal(4, items.Count);
        }
    }
}
