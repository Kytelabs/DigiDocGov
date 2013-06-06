class DatafieldsController < ApplicationController
  # GET /datafields
  # GET /datafields.json
  def index
    @datafields = Datafield.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @datafields }
    end
  end

  # GET /datafields/1
  # GET /datafields/1.json
  def show
    @datafield = Datafield.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @datafield }
    end
  end

  # GET /datafields/new
  # GET /datafields/new.json
  def new
    @datafield = Datafield.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @datafield }
    end
  end

  # GET /datafields/1/edit
  def edit
    @datafield = Datafield.find(params[:id])
  end

  # POST /datafields
  # POST /datafields.json
  def create
    @datafield = Datafield.new(params[:datafield])

    respond_to do |format|
      if @datafield.save
        format.html { redirect_to @datafield, notice: 'Datafield was successfully created.' }
        format.json { render json: @datafield, status: :created, location: @datafield }
      else
        format.html { render action: "new" }
        format.json { render json: @datafield.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /datafields/1
  # PUT /datafields/1.json
  def update
    @datafield = Datafield.find(params[:id])

    respond_to do |format|
      if @datafield.update_attributes(params[:datafield])
        format.html { redirect_to @datafield, notice: 'Datafield was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @datafield.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /datafields/1
  # DELETE /datafields/1.json
  def destroy
    @datafield = Datafield.find(params[:id])
    @datafield.destroy

    respond_to do |format|
      format.html { redirect_to datafields_url }
      format.json { head :no_content }
    end
  end
end
