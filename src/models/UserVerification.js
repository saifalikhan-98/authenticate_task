// Define the UserVerification model
export const UserVerification = sequelize.define('UserVerification', {
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  // Define the association between User and UserVerification
  User.hasOne(UserVerification);
  UserVerification.belongsTo(User);