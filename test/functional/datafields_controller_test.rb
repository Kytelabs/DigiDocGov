require 'test_helper'

class DatafieldsControllerTest < ActionController::TestCase
  setup do
    @datafield = datafields(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:datafields)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create datafield" do
    assert_difference('Datafield.count') do
      post :create, datafield: { fieldType: @datafield.fieldType, name: @datafield.name }
    end

    assert_redirected_to datafield_path(assigns(:datafield))
  end

  test "should show datafield" do
    get :show, id: @datafield
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @datafield
    assert_response :success
  end

  test "should update datafield" do
    put :update, id: @datafield, datafield: { fieldType: @datafield.fieldType, name: @datafield.name }
    assert_redirected_to datafield_path(assigns(:datafield))
  end

  test "should destroy datafield" do
    assert_difference('Datafield.count', -1) do
      delete :destroy, id: @datafield
    end

    assert_redirected_to datafields_path
  end
end
